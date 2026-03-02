import { useEffect, useState } from "react";
import "./Staff.css"; // you can rename to FacultyStaff.css later

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

  if (status === "loading") return <div className="page">Loading…</div>;
  if (status === "error") return <div className="page">Error: {error}</div>;

  return (
    <div className="page">
      <h2 className="pageTitle">Faculty & Staff</h2>

      <div className="grid">
        {items.map((it) => {
          const imgSrc = it.imageUrl
            ? `http://localhost:5174/api/img?url=${encodeURIComponent(it.imageUrl)}`
            : "";

          const key = it.profileUrl || it.imageUrl || `${it.name}-${it.title}`;

          return (
            <a
              key={key}
              className="card"
              href={it.profileUrl || "#"}
              target={it.profileUrl ? "_blank" : "_self"}
              rel="noreferrer"
            >
              {imgSrc && (
                <img className="cardImg" src={imgSrc} alt={it.name || "profile"} />
              )}

              <div className="cardBody">
                <div className="cardName">{it.name}</div>
                {it.title && <div className="cardTitle">{it.title}</div>}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}