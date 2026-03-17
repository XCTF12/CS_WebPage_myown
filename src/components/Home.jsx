import { useEffect, useMemo, useState } from "react";
import "./Home.css";

function Home({ onExplorePrograms }) {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(null);

  const alfredLinks = useMemo(
    () => ({
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
    <div className="homePageFull">
      {/* HERO */}
      <section className="heroSectionFull">
        <div className="heroGlow heroGlowOne"></div>
        <div className="heroGlow heroGlowTwo"></div>

        <div className="homeInner">
          <div className="heroContentFull">
            <div className="heroLeft">
              <p className="heroEyebrow">Department of Computer Science</p>

              <h1 className="heroTitle">
                Computer
                <br />
                Science
              </h1>

              <p className="heroText">
                Explore innovation, research, programming, and problem-solving
                at Alfred University. Build strong foundations in software,
                systems, cybersecurity, AI, and data.
              </p>

              <div className="heroButtons">
                <button
                  className="heroBtnPrimary"
                  type="button"
                  onClick={onExplorePrograms}
                >
                  Explore Our Programs
                </button>

                <a
                  className="heroBtnSecondary"
                  href={alfredLinks.viewProjects}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Projects
                </a>
              </div>

              <div className="heroMiniStats">
                <div className="heroStatCard">
                  <span className="heroStatTitle">Hands-on</span>
                  <span className="heroStatText">projects & labs</span>
                </div>

                <div className="heroStatCard">
                  <span className="heroStatTitle">Career</span>
                  <span className="heroStatText">ready skills</span>
                </div>

                <div className="heroStatCard">
                  <span className="heroStatTitle">Support</span>
                  <span className="heroStatText">faculty mentoring</span>
                </div>
              </div>
            </div>

            <div className="heroRight">
              <div className="heroVisualCard mainVisual">
                <img
                  src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80"
                  alt="Computer Science workspace"
                />
              </div>

              <div className="floatingCard floatingTop">
                <h3>Alfred CS Snapshot</h3>
                <p>Software • Systems • AI • Cybersecurity</p>
              </div>

              <div className="floatingCard floatingBottom">
                <h3>Interactive Learning</h3>
                <p>Projects, labs, research, and faculty support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="featureSection">
        <div className="homeInner">
          <div className="featureCards">
            <div className="featureCard">
              <div className="featureImage featureNews"></div>
              <div className="featureBody">
                <h3>Latest News</h3>
                <p>
                  Stay updated with program highlights, student work, and
                  university announcements.
                </p>
              </div>
            </div>

            <div className="featureCard">
              <div className="featureImage featureFaculty"></div>
              <div className="featureBody">
                <h3>Our Faculty</h3>
                <p>
                  Meet the professors and staff helping students grow in
                  computer science.
                </p>
              </div>
            </div>

            <div className="featureCard">
              <div className="featureImage featureEvents"></div>
              <div className="featureBody">
                <h3>Events & Projects</h3>
                <p>
                  Discover events, research projects, and opportunities across
                  the department.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM GRID */}
      <section className="contentSection">
        <div className="homeInner">
          <div className="homeBottomGrid">
            <div className="glassCard glassCardPrograms">
              <div className="sectionTopRow">
                <div>
                  <p className="miniEyebrow">Academic Paths</p>
                  <h2>Explore Programs</h2>
                </div>
              </div>

              <div className="programGrid">
                {alfredLinks.programs.map((p) => (
                  <a
                    key={p.title}
                    className="programCard"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="programIcon">✦</div>
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glassCard glassCardNews">
              <div className="sectionTopRow">
                <div>
                  <p className="miniEyebrow">Latest Updates</p>
                  <h2>Alfred University News</h2>
                </div>
                <a
                  className="sectionLink"
                  href={alfredLinks.newsAll}
                  target="_blank"
                  rel="noreferrer"
                >
                  View all
                </a>
              </div>

              {loadingNews && <p className="mutedLight">Loading news…</p>}

              {!loadingNews && newsError && (
                <p className="mutedLight">
                  Couldn’t load live news ({newsError}). Showing sample items instead.
                </p>
              )}

              <ul className="newsListModern">
                {(news.length ? news : sampleNews).slice(0, 5).map((item, idx) => (
                  <li key={idx} className="newsRow">
                    <span className="newsDot"></span>
                    <div className="newsContent">
                      <a
                        className="newsRowTitle"
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.title}
                      </a>
                      <span className="newsRowDate">{item.date || "Latest"}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glassCard infoPanel">
              <div className="panelHeader">
                <p className="miniEyebrow">Resources</p>
                <h2>Quick Links</h2>
              </div>

              <div className="quickLinksModern">
                {alfredLinks.quickLinks.map((q) => (
                  <a key={q.label} href={q.link} target="_blank" rel="noreferrer">
                    <span>{q.label}</span>
                    <span className="arrowMark">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glassCard infoPanel">
              <div className="panelHeader">
                <p className="miniEyebrow">Connect</p>
                <h2>Contact</h2>
              </div>

              <div className="contactModern">
                <div className="contactRow">
                  <span className="contactLabel">Department</span>
                  <span>Computer Science</span>
                </div>
                <div className="contactRow">
                  <span className="contactLabel">School</span>
                  <span>Alfred University</span>
                </div>
                <div className="contactRow">
                  <span className="contactLabel">Location</span>
                  <span>Alfred, NY 14802</span>
                </div>
                <div className="contactRow">
                  <span className="contactLabel">Email</span>
                  <a href="mailto:cs@alfred.edu">cs@alfred.edu</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;