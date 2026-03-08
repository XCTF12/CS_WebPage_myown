import { useEffect, useState } from "react";
import "./Staff.css";

export default function Staff() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        setStatus("loading");
        setError("");

        const r = await fetch("http://localhost:5174/api/alfred-cs-staff", {
          signal: controller.signal,
        });

        if (!r.ok) throw new Error(`Fetch failed: ${r.status}`);
        const data = await r.json();

        setItems(Array.isArray(data) ? data : []);
        setStatus("ok");
      } catch (e) {
        if (e.name === "AbortError") return;
        setStatus("error");
        setError(e?.message || "Unknown error");
      }
    };

    run();
    return () => controller.abort();
  }, []);

  const filteredItems = items.filter((it) => {
    const name = (it.name || "").trim();
    const title = (it.title || "").trim();
    const combined = `${name} ${title}`;

    const hasValidName =
      name.length > 4 &&
      name.length < 40 &&
      name.split(" ").length >= 2 &&
      !name.includes("The study of information") &&
      !name.includes("Faculty / Staff Each") &&
      !name.includes("Facilities");

    const hasValidTitle =
      title.length > 5 &&
      title.length < 120 &&
      /professor|instructor|lecturer/i.test(title);

    const looksLikeFaculty =
      /professor|instructor|lecturer|computer science|mathematics/i.test(combined);

    return hasValidName && hasValidTitle && looksLikeFaculty;
  });

  if (status === "loading") {
    return (
      <div className="staffPage">
        <div className="staffState">Loading faculty and staff...</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="staffPage">
        <div className="staffState error">Error: {error}</div>
      </div>
    );
  }

  return (
    <section className="staffPage">
      <div className="staffHeader">
        <p className="staffEyebrow">Department Directory</p>
        <h2 className="staffTitle">Faculty & Staff</h2>
        <p className="staffSubtitle">
          Meet the faculty and staff of Alfred University Computer Science.
        </p>
      </div>

      <div className="staffGrid">
        {filteredItems.map((it) => {
          const imgSrc = it.imageUrl
            ? `http://localhost:5174/api/img?url=${encodeURIComponent(it.imageUrl)}`
            : "";

          const key = it.profileUrl || it.imageUrl || `${it.name}-${it.title}`;

          return (
            <a
              key={key}
              className="staffCard"
              href={it.profileUrl || "#"}
              target={it.profileUrl ? "_blank" : "_self"}
              rel="noreferrer"
            >
              <div className="staffImageWrap">
                {imgSrc ? (
                  <img
                    className="staffImage"
                    src={imgSrc}
                    alt={it.name || "Faculty profile"}
                  />
                ) : (
                  <div className="staffImagePlaceholder">AU</div>
                )}
              </div>

              <div className="staffCardBody">
                <h3 className="staffName">{it.name}</h3>
                <p className="staffRole">{it.title}</p>
                <span className="staffLink">View Profile</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}