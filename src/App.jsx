import { useState } from "react";
import "./App.css";

import Home from "./components/Home";
import Project from "./components/Projects";
import Classes from "./components/classes";
import Events from "./components/Events";
import About from "./components/Information";
import Programs from "./components/Program";
import FacultyStaff from "./components/Staff";

function App() {
  const renderHome = () => (
    <Home onExplorePrograms={() => setSection(<Programs />)} />
  );

  const [section, setSection] = useState(renderHome());

  return (
    <div className="main">
      <div className="main2">
        <header className="header">
          <div className="headerTop">
            <div className="topLinks">
              <a href="#">SCHOOLS</a>
              <a href="#">LIBRARIES</a>
              <a href="#">RESOURCES</a>
            </div>
          </div>

          <div className="headerMain">
            <div className="headerLeft">
              <img
                className="logo"
                src="/images.png"
                alt="Alfred University Logo"
              />

              <div className="schoolText">
                <div className="schoolName">ALFRED UNIVERSITY</div>
                <div className="schoolSub">COLLEGE OF ARTS AND SCIENCES</div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="headerRight">
              <div className="deptSmall">Department of</div>
              <div className="deptBig">Computer Science</div>
            </div>
          </div>
        </header>

        <div className="main_button">
          <button className="boton" onClick={() => setSection(renderHome())}>
            Home
          </button>

          <button className="boton" onClick={() => setSection(<About />)}>
            About
          </button>

          <button className="boton" onClick={() => setSection(<FacultyStaff />)}>
            Staff
          </button>

          <button className="boton" onClick={() => setSection(<Classes />)}>
            Classes
          </button>

          <button className="boton" onClick={() => setSection(<Events />)}>
            Events
          </button>

          <button className="boton" onClick={() => setSection(<Project />)}>
            Projects
          </button>

          <button className="boton" onClick={() => setSection(<Programs />)}>
            Programs
          </button>
        </div>

        <div className="content">{section}</div>
      </div>
    </div>
  );
}

export default App;