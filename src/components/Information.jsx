import './Information.css'



function Info() {
  return (
    <div className="about">

      {/* Hero Section */}
      <section className="aboutHero">

        <div className="aboutHeroText">
          <h2>About the Computer Science Program</h2>

          <p>
            The Computer Science program prepares students to design, build,
            and secure modern software systems. Students gain strong foundations
            in programming, data structures, and computer systems while applying
            their knowledge through hands-on projects and collaborative learning.
          </p>

          <div className="aboutHeroActions">
            <button className="aboutCta">Explore Curriculum</button>
            <button className="aboutCtaOutline">Student Outcomes</button>
          </div>
        </div>

        <div className="aboutStats">
          <div className="statCard">
            <div className="statNum">Software</div>
            <div className="statLabel">Development</div>
            <div className="statSub">Full-stack & application design</div>
          </div>

          <div className="statCard">
            <div className="statNum">Data</div>
            <div className="statLabel">Analytics</div>
            <div className="statSub">Databases & problem solving</div>
          </div>

          <div className="statCard">
            <div className="statNum">Security</div>
            <div className="statLabel">Foundations</div>
            <div className="statSub">Cybersecurity principles</div>
          </div>
        </div>

      </section>


      {/* Curriculum Grid */}
      <section className="aboutGrid">

        <div className="aboutCard">
          <h3>What You'll Study</h3>
          <ul>
            <li>Python, Java, C/C++</li>
            <li>Data Structures & Algorithms</li>
            <li>Web Development</li>
            <li>Databases</li>
            <li>Computer Systems</li>
          </ul>
        </div>

        <div className="aboutCard">
          <h3>How You'll Learn</h3>
          <ul>
            <li>Hands-on Labs</li>
            <li>Team Projects</li>
            <li>Capstone Experience</li>
            <li>Research Opportunities</li>
            <li>Internships</li>
          </ul>
        </div>

        <div className="aboutCard">
          <h3>Career Paths</h3>
          <ul>
            <li>Software Engineer</li>
            <li>Front-End Developer</li>
            <li>Cybersecurity Analyst</li>
            <li>Data Analyst</li>
            <li>IT Specialist</li>
          </ul>
        </div>

      </section>

    </div>
  )
}

export default Info