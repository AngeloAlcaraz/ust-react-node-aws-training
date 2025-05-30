import { useLocation } from "react-router-dom";

interface SearchBarProps {
  searchText: string;
  onSearchTextChange: (term: string) => void;
}

function SearchBar({ searchText, onSearchTextChange }: SearchBarProps) {
  const location = useLocation();
  const isProjectPath = location.pathname === "/projects";

  return (
    <div className={`searchbar-form ${!isProjectPath ? 'disabled' : ''}`}>
      <span className="icon-search"></span>
      <input
        type="text"
        placeholder="SEARCH A PROJECT..."
        className="search-input"
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        disabled={!isProjectPath}
      />
    </div>
  );
}

export default SearchBar;
