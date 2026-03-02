import express from "express";
import cors from "cors";
import * as cheerio from "cheerio";

const app = express();

// Allow your Vite frontend to fetch from this server
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

/**
 * Existing endpoint: Alfred News
 */
app.get("/api/alfred-news", async (req, res) => {
  try {
    const url = "https://www.alfred.edu/about/news/";
    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html",
      },
    });

    if (!r.ok) {
      return res.status(r.status).json({ error: `Upstream ${r.status}` });
    }

    const html = await r.text();
    const $ = cheerio.load(html);

    const items = [];

    $("a[href$='.cfm'], a[href*='.cfm?']").each((_, a) => {
      const href = $(a).attr("href");
      const title = $(a).text().trim();

      if (!title || !href) return;
      if (!href.includes("/about/news/")) return;

      if (href.includes("category-listings")) return;
      if (href.includes("/studies/")) return;
      if (href.includes("/newsletters/")) return;
      if (href.includes("index.cfm")) return;

      const link = href.startsWith("http")
        ? href
        : `https://www.alfred.edu${href}`;

      let dateText =
        $(a).closest("li, p, div").text().replace(title, "").trim() ||
        $(a).parent().text().replace(title, "").trim();

      dateText = (dateText || "")
        .replace(/\s+/g, " ")
        .replace("•", "")
        .trim();

      const m = dateText.match(
        /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{1,2},\s+\d{4}\b/i
      );
      const date = m ? m[0] : "";

      items.push({ title, date, link });
    });

    const out = [];
    const seen = new Set();

    for (const it of items) {
      if (seen.has(it.link)) continue;
      seen.add(it.link);
      out.push(it);
      if (out.length >= 10) break;
    }

    return res.json(out);
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
});


app.get("/api/alfred-cs-staff", async (req, res) => {
  try {
    const url =
      "https://www.alfred.edu/academics/undergrad-majors-minors/computer-science.cfm";

    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html",
      },
    });

    if (!r.ok) {
      return res.status(r.status).json({ error: `Upstream ${r.status}` });
    }

    const html = await r.text();
    const $ = cheerio.load(html);

    const peopleRaw = [];


    const candidates = $(".swiper-slide, .slide, .card, figure, article, a, div");

    candidates.each((_, el) => {
      const $el = $(el);

      const img = $el.find("img").first();
      const src = (img.attr("src") || "").trim();
      if (!src) return;

   
      let text = $el.text().replace(/\s+/g, " ").trim();
      if (!text || text.length < 6) return;

     
      const imageUrl = src.startsWith("http")
        ? src
        : `https://www.alfred.edu${src.startsWith("/") ? "" : "/"}${src}`;


      const href =
        ($el.is("a") ? $el.attr("href") : $el.find("a").first().attr("href")) ||
        "";
      const profileUrl = href
        ? href.startsWith("http")
          ? href
          : `https://www.alfred.edu${href.startsWith("/") ? "" : "/"}${href}`
        : "";

  
      let name = "";
      let title = "";

      const profIndex = text.search(
        /\b(Professor|Lecturer|Instructor|Assistant Professor|Associate Professor)\b/i
      );
      if (profIndex > 0) {
        name = text.slice(0, profIndex).trim();
        title = text.slice(profIndex).trim();
      } else {
        const parts = text.split(" ").filter(Boolean);
        name = parts.slice(0, 2).join(" ");
        title = parts.slice(2).join(" ");
      }

      name = name.replace(/^[•\-–]+/, "").trim();
      title = title.replace(/^[•\-–]+/, "").trim();

      peopleRaw.push({ name, title, imageUrl, profileUrl, label: text });
    });

    // De-dupe by imageUrl
    const seen = new Set();
    const people = [];

    for (const p of peopleRaw) {
      if (!p.imageUrl) continue;
      if (seen.has(p.imageUrl)) continue;
      seen.add(p.imageUrl);

      // Avoid obvious non-staff images (logos, icons)
      const lower = p.imageUrl.toLowerCase();
      if (lower.includes("logo") || lower.includes("icon")) continue;

      people.push({
        name: p.name || p.label,
        title: p.title || "",
        imageUrl: p.imageUrl,
        profileUrl: p.profileUrl || "",
      });

      if (people.length >= 12) break;
    }

    return res.json(people);
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
});


app.get("/api/alfred-cs-snapshot", async (req, res) => {
  try {
    const url =
      "https://www.alfred.edu/academics/undergrad-majors-minors/computer-science.cfm";

    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html",
      },
    });

    if (!r.ok) return res.status(r.status).json({ error: `Upstream ${r.status}` });

    const html = await r.text();
    const $ = cheerio.load(html);


    const h = $("h2, h3")
      .filter((_, el) => $(el).text().trim().toLowerCase() === "program snapshot")
      .first();

    if (!h.length) return res.json({ error: "Program Snapshot section not found" });

    const section = h.closest("section, div");

    const pick = (label) => {
      const node = section
        .find("*")
        .filter(
          (_, el) => $(el).text().trim().toLowerCase() === label.toLowerCase()
        )
        .first();

      if (!node.length) return "";
      const container = node.closest("div, li, p");
      const text = container.text().replace(/\s+/g, " ").trim();
      const out = text.replace(new RegExp(label, "i"), "").trim();
      return out;
    };

    const schoolDivision = pick("School/Division");
    const campusLocations = pick("Campus Locations");
    const major = pick("Major");
    const doubleMajor = pick("Double Major");
    const minor = pick("Minor");

    // Contact block
    const contactLabel = section
      .find("*")
      .filter((_, el) => $(el).text().trim().toLowerCase() === "program contact")
      .first();

    let contactName = "";
    let contactEmail = "";
    let contactPhone = "";

    if (contactLabel.length) {
      const contactContainer = contactLabel.closest("div, section").parent();

      contactName =
        contactContainer.find("a").first().text().replace(/\s+/g, " ").trim() ||
        contactContainer
          .find("strong")
          .first()
          .text()
          .replace(/\s+/g, " ")
          .trim();

      const emailHref =
        contactContainer.find("a[href^='mailto:']").attr("href") || "";
      contactEmail = emailHref.replace("mailto:", "").trim();

      const telHref = contactContainer.find("a[href^='tel:']").attr("href") || "";
      contactPhone = telHref.replace("tel:", "").trim();

      if (!contactPhone) {
        const raw = contactContainer.text().replace(/\s+/g, " ").trim();
        const m = raw.match(/(\(?\d{3}\)?[-\s]\d{3}[-\s]\d{4})/);
        contactPhone = m ? m[1] : "";
      }
    }

  
    const img = section.find("img").first().attr("src") || "";
    const imageUrl = img
      ? img.startsWith("http")
        ? img
        : `https://www.alfred.edu${img.startsWith("/") ? "" : "/"}${img}`
      : "";

    return res.json({
      schoolDivision,
      campusLocations,
      major,
      doubleMajor,
      minor,
      contact: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
      },
      imageUrl,
      sourceUrl: url,
    });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
});


app.get("/api/img", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url || typeof url !== "string") {
      return res.status(400).send("Missing url");
    }

    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "image/*",
        Referer: "https://www.alfred.edu/",
      },
    });

    if (!r.ok) return res.status(r.status).send("Upstream image error");

    res.setHeader("Content-Type", r.headers.get("content-type") || "image/jpeg");

    const buf = Buffer.from(await r.arrayBuffer());
    return res.send(buf);
  } catch (e) {
    return res.status(500).send(e?.message || "Image proxy error");
  }
});

app.listen(5174, () => {
  console.log("API running on http://localhost:5174");
  console.log("Test news:     http://localhost:5174/api/alfred-news");
  console.log("Test staff:    http://localhost:5174/api/alfred-cs-staff");
  console.log("Test snapshot: http://localhost:5174/api/alfred-cs-snapshot");
});