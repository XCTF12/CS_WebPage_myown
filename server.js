// server.js
import express from "express";
import * as cheerio from "cheerio";

const app = express();

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

    // 1) Look for links that are likely actual news articles
    // Alfred news articles commonly use .cfm pages; filter out category listings & indexes
    $("a[href$='.cfm'], a[href*='.cfm?']").each((_, a) => {
      const href = $(a).attr("href");
      const title = $(a).text().trim();

      if (!title || !href) return;

      // Only keep links inside /about/news/
      if (!href.includes("/about/news/")) return;

      // Filter out navigation/category pages
      if (href.includes("category-listings")) return;
      if (href.includes("/studies/")) return;
      if (href.includes("/newsletters/")) return;
      if (href.includes("index.cfm")) return;

      // Make absolute link
      const link = href.startsWith("http") ? href : `https://www.alfred.edu${href}`;

      // 2) Try to find a date near the link (best-effort)
      // Grab text from a nearby container and remove the title
      let dateText =
        $(a).closest("li, p, div").text().replace(title, "").trim() ||
        $(a).parent().text().replace(title, "").trim();

      // Clean up date text
      dateText = (dateText || "")
        .replace(/\s+/g, " ")
        .replace("•", "")
        .trim();

      // Attempt to pull something that looks like "Feb 12, 2026"
      const m = dateText.match(
        /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{1,2},\s+\d{4}\b/i
      );
      const date = m ? m[0] : "";

      items.push({ title, date, link });
    });

    // 3) De-dupe by link and return top 10
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

app.listen(5174, () => {
  console.log("API running on http://localhost:5174");
  console.log("Test: http://localhost:5174/api/alfred-news");
});