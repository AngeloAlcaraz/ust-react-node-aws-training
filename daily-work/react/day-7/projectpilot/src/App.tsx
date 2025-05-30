import "./App.css";
import { useState } from "react";
import HomePage from "./home/HomePage";
import ProjectsPage from "./projects/ProjectsPage";
import ProjectPage from './projects/ProjectPage';
import NewProjectPage from "./projects/NewProjectPage";
import SearchBar from "./projects/SearchBar";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  
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
          <SearchBar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}           
          />
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
