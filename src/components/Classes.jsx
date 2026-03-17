import "./Classes.css";

export default function Classes() {
  const coreCourses = [
    { code: "CSCI 156", title: "Computer Science I", credits: 4 },
    { code: "CSCI 157", title: "Computer Science II", credits: 4 },
    { code: "CSCI 206", title: "Algorithm Design", credits: 4 },
    { code: "CSCI 225", title: "Computer Organization", credits: 4 },
    { code: "CSCI 305", title: "Theory of Computation", credits: 4 },
    { code: "CSCI 425", title: "Operating Systems", credits: 4 },
    { code: "MATH 151", title: "Calculus I", credits: 4 },
    { code: "MATH 181 or MATH 281", title: "Choose one of these courses", credits: 4 },
  ];

  const electiveCourses = [
    { code: "CSCI 311", title: "Database Systems", credits: 4 },
    { code: "CSCI 315", title: "Computer Networking", credits: 4 },
    { code: "MATH 231", title: "Introduction to Data Science", credits: 4 },
    { code: "MATH 351", title: "Introduction to Operations Research", credits: 4 },
    { code: "MATH 371", title: "Linear Algebra", credits: 4 },
    { code: "MATH 381", title: "Mathematical Statistics", credits: 4 },
  ];

  const universityRequirements = [
    "Global Perspective (GP)",
    "Common Ground",
    "Lifetime Health and Wellness",
  ];

  return (
    <section className="classesPage">
      <div className="classesHero">
        <p className="classesEyebrow">Program Curriculum</p>
        <h1 className="classesTitle">Computer Science Course Requirements</h1>
        <p className="classesSubtitle">
          These are the main courses and elective requirements for the Computer
          Science program at Alfred University.
        </p>
      </div>

      <div className="classesSection">
        <div className="sectionHeader">
          <h2>Core Requirements</h2>
          <span className="creditBadge">32 Credits</span>
        </div>

        <div className="tableCard">
          <table className="classesTable">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Title</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {coreCourses.map((course) => (
                <tr key={course.code}>
                  <td>{course.code}</td>
                  <td>{course.title}</td>
                  <td>{course.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="classesSection">
        <div className="sectionHeader">
          <h2>Elective Requirements</h2>
          <span className="creditBadge">13 Credits</span>
        </div>

        <p className="sectionText">
          Complete 13 credit hours of computer science courses and electives
          from the following list, with at least 8 of those credits at the
          300-level or higher.
        </p>

        <div className="tableCard">
          <table className="classesTable">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Title</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {electiveCourses.map((course) => (
                <tr key={course.code}>
                  <td>{course.code}</td>
                  <td>{course.title}</td>
                  <td>{course.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="sectionNote">
          Other elective courses may be approved with division permission. Some
          elective computer science courses require prerequisite courses and may
          only be offered in certain semesters.
        </p>
      </div>

      <div className="infoGrid">
        <div className="infoCard">
          <h3>CLAS General Education Requirements</h3>
          <p>
            Complete the remaining CLAS general education requirements. Computer
            Science majors complete quantitative reasoning credits as part of
            the degree program.
          </p>
          <div className="infoNumber">48 Credits</div>
        </div>

        <div className="infoCard">
          <h3>University Requirement</h3>
          <p>
            The university requirements must also be fulfilled and count toward
            the minimum credit requirement for the program.
          </p>
          <ul className="requirementList">
            {universityRequirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="infoCard">
          <h3>General Electives</h3>
          <p>
            Take as many general elective courses as needed to complete the full
            degree requirements.
          </p>
          <div className="infoNumber">Total Credits: 124</div>
        </div>
      </div>
    </section>
  );
}