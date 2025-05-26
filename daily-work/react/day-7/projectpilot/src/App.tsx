import "./App.css";
import { BrowserRouter, Route, Routes, NavLink } from "react-router";
import HomePage from "./home/HomePage";
import ProjectsPage from "./projects/ProjectsPage";
import ProjectPage from './projects/ProjectPage';
import NewProjectPage from "./projects/newProjectPage";

function App() {

  return (
    <BrowserRouter>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects" className="button rounded" end>
          Projects
        </NavLink>
        <NavLink to="/projects/new" className="button rounded">
          New Projects
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;