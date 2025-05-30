import "./App.css";
import { BrowserRouter, Route, Routes, NavLink, useLocation } from "react-router-dom";
import HomePage from "./home/HomePage";
import ProjectsPage from "./projects/ProjectsPage";
import ProjectPage from './projects/ProjectPage';
import NewProjectPage from "./projects/newProjectPage";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  // Solo habilita el search si estás exactamente en /projects
  const isSearchEnabled = location.pathname === "/projects";

  return (
    <>
      <header className="sticky header-bar">
        <div className="header-content">
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
          <NavLink to="/projects/new" className="button rounded" style={{ marginRight: '2rem' }} end>
            New Project
          </NavLink>
          <div className={`searchbar-form ${!isSearchEnabled ? 'disabled' : ''}`}>
            <span className="icon-search"></span>
            <input
              type="text"
              placeholder="SEARCH A PROJECT..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={!isSearchEnabled}
            />
          </div>
        </div>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage searchTerm={searchTerm} />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
        </Routes>
      </div>
    </>
  );
}

export default function AppWrapper() {
  // Este wrapper asegura que useLocation funcione dentro de App
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
