import "./App.css";
import { useState } from "react";
import HomePage from "./components/home/home-component";
import ProjectsPage from "./components/projects/ProjectsPage";
import ProjectPage from './components/projects/ProjectPage';
import NewProjectPage from "./components/projects/add-new-project.component";
import SearchBar from "./components/projects/SearchBar";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
   <BrowserRouter>
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
            searchText={searchTerm}
            onSearchTextChange={setSearchTerm}           
          />
        </div>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage searchText={searchTerm} />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
        </Routes>
      </div>
   </BrowserRouter>
  );
}

export default App;