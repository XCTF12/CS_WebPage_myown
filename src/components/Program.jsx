import { useEffect, useState } from "react";
import "./Program.css";

export default function Programs() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        setStatus("loading");
        setError("");

        const r = await fetch("http://localhost:5174/api/alfred-cs-snapshot", {
          signal: controller.signal,
        });

        if (!r.ok) throw new Error(`Fetch failed: ${r.status}`);
        const json = await r.json();

        if (json?.error) throw new Error(json.error);

        setData(json);
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

  if (status === "loading") return <div className="page">Loading program info…</div>;
  if (status === "error") return <div className="page">Error: {error}</div>;
  if (!data) return null;

  const bg = data.imageUrl
    ? `http://localhost:5174/api/img?url=${encodeURIComponent(data.imageUrl)}`
    : "";

  return (
    <div className="page">
      <h2 className="pageTitle">Program Snapshot</h2>

      <div
        className="snapshot"
        style={{
          backgroundImage: bg
            ? `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${bg})`
            : undefined,
        }}
      >
        <div className="snapGrid">
          <div className="snapCol">
            <div className="snapLabel">School/Division</div>
            <div className="snapValue">{data.schoolDivision || "—"}</div>

            <div className="snapLabel mt">Campus Locations</div>
            <div className="snapValue">{data.campusLocations || "—"}</div>
          </div>

          <div className="snapCol">
            <div className="snapLabel">Major</div>
            <div className="snapValue">{data.major || "—"}</div>

            <div className="snapLabel mt">Double Major</div>
            <div className="snapValue">{data.doubleMajor || "—"}</div>

            <div className="snapLabel mt">Minor</div>
            <div className="snapValue">{data.minor || "—"}</div>
          </div>

          <div className="snapCol noBorder">
            <div className="snapLabel">Program Contact</div>
            <div className="snapValue">{data.contact?.name || "—"}</div>

            {data.contact?.email && (
              <a className="snapLink" href={`mailto:${data.contact.email}`}>
                {data.contact.email}
              </a>
            )}

            {data.contact?.phone && (
              <a className="snapLink" href={`tel:${data.contact.phone}`}>
                {data.contact.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}