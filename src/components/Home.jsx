import { useEffect, useMemo, useState } from "react";
import "./Home.css";

function Home({ onExplorePrograms }) {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(null);

  const alfredLinks = useMemo(
    () => ({
      explorePrograms: "https://www.alfred.edu/academics/",
      viewProjects: "https://www.alfred.edu/academics/",
      newsAll: "https://www.alfred.edu/about/news/",
      programs: [
        {
          title: "Computer Science (BS/BA)",
          desc: "Core programming, systems, algorithms, and software engineering.",
          link: "https://www.alfred.edu/academics/",
        },
        {
          title: "Data Science",
          desc: "Analytics, visualization, statistics, and data-driven decision making.",
          link: "https://www.alfred.edu/academics/",
        },
        {
          title: "Cybersecurity",
          desc: "Security concepts, networks, and real-world defensive thinking.",
          link: "https://www.alfred.edu/academics/",
        },
        {
          title: "AI & Machine Learning",
          desc: "Models, training, evaluation, and modern ML applications.",
          link: "https://www.alfred.edu/academics/",
        },
      ],
      quickLinks: [
        { label: "Faculty & Staff", link: "https://www.alfred.edu/academics/" },
        { label: "Course Catalog", link: "https://www.alfred.edu/academics/" },
        { label: "Internships & Careers", link: "https://www.alfred.edu/careers/" },
        { label: "Research Opportunities", link: "https://www.alfred.edu/academics/" },
      ],
    }),
    []
  );

  const sampleNews = useMemo(
    () => [
      {
        title: "Student projects featured in Spring Showcase",
        date: "Feb 2026",
        link: "https://www.alfred.edu/about/news/",
      },
      {
        title: "New AI & Data Science electives now available",
        date: "Jan 2026",
        link: "https://www.alfred.edu/about/news/",
      },
      {
        title: "Faculty talk: Cybersecurity in the real world",
        date: "Dec 2025",
        link: "https://www.alfred.edu/about/news/",
      },
    ],
    []
  );

  useEffect(() => {
    const FEED_URL = "http://localhost:5174/api/alfred-news"; 

    async function loadNews() {
      try {
        setLoadingNews(true);
        setNewsError(null);

        const res = await fetch(FEED_URL);
        if (!res.ok) throw new Error(`News fetch failed: ${res.status}`);

        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        setNewsError(err?.message || "Failed to fetch");
        setNews([]);
      } finally {
        setLoadingNews(false);
      }
    }

    loadNews();
  }, []);

  return (
    <div className="homeWrap">
      {/* HERO */}
      <section className="homeHero">
        <div className="homeHeroText">
          <h1 className="homeTitle">Welcome to Computer Science</h1>
          <p className="homeSubtitle">
            Build real software. Learn the fundamentals. Explore AI, cybersecurity,
            data, and web development.
          </p>

          <div className="homeCtas">
            <button
              className="homeBtnPrimary"
              type="button"
              onClick={onExplorePrograms}
            >
              Explore Programs
            </button>
            <a
              className="homeBtnSecondary"
              href={alfredLinks.viewProjects}
              target="_blank"
              rel="noreferrer"
            >
              View Projects
            </a>
          </div>

          <div className="homeStats">
            <div className="statCard">
              <div className="statNum">Hands-on</div>
              <div className="statLabel">projects & labs</div>
            </div>
            <div className="statCard">
              <div className="statNum">Career</div>
              <div className="statLabel">ready skills</div>
            </div>
            <div className="statCard">
              <div className="statNum">Support</div>
              <div className="statLabel">faculty mentoring</div>
            </div>
          </div>
        </div>

        <div className="homeHeroMedia">
          <div className="homeHeroMediaFallback">
            <div className="fallbackBox">
              <div className="fallbackTitle">Department Highlights</div>
              <ul className="fallbackList">
                <li>Software Engineering</li>
                <li>AI / Machine Learning</li>
                <li>Cybersecurity</li>
                <li>Data Science</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="homeGrid">
        <div className="homeCard">
          <h2 className="homeCardTitle">Explore Programs</h2>

          <div className="cardGrid">
            {alfredLinks.programs.map((p) => (
              <a
                key={p.title}
                className="miniCard"
                href={p.link}
                target="_blank"
                rel="noreferrer"
              >
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="homeCard">
          <div className="homeCardHeaderRow">
            <h2 className="homeCardTitle">Alfred University News</h2>
            <a
              className="homeCardLink"
              href={alfredLinks.newsAll}
              target="_blank"
              rel="noreferrer"
            >
              View all
            </a>
          </div>

          {loadingNews && <p className="muted">Loading news…</p>}

          {!loadingNews && newsError && (
            <p className="muted">
              Couldn’t load live news yet ({newsError}). Showing sample items for now.
            </p>
          )}

          <ul className="newsList">
            {(news.length ? news : sampleNews).slice(0, 5).map((item, idx) => (
              <li key={idx} className="newsItem">
                <a
                  className="newsTitle"
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.title}
                </a>
                <div className="newsMeta">{item.date || "Latest"}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="homeCard">
          <h2 className="homeCardTitle">Quick Links</h2>
          <div className="quickLinks">
            {alfredLinks.quickLinks.map((q) => (
              <a key={q.label} href={q.link} target="_blank" rel="noreferrer">
                {q.label}
              </a>
            ))}
          </div>
        </div>

     
        <div className="homeCard">
          <h2 className="homeCardTitle">Contact</h2>
          <div className="contactBlock">
            <div>
              <strong>Department of Computer Science</strong>
            </div>
            <div>Alfred University</div>
            <div>Alfred, NY 14802</div>
            <div className="muted">
              Email: <a href="mailto:cs@alfred.edu">cs@alfred.edu</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;