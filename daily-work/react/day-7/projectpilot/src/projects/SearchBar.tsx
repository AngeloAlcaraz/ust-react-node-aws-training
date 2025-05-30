import { useLocation } from "react-router-dom";

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

function SearchBar({ searchTerm, onSearchTermChange }: SearchBarProps) {
  const location = useLocation();
  const enabled = location.pathname === "/projects";

  return (
    <div className={`searchbar-form ${!enabled ? 'disabled' : ''}`}>
      <span className="icon-search"></span>
      <input
        type="text"
        placeholder="SEARCH A PROJECT..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        disabled={!enabled}
      />
    </div>
  );
}

export default SearchBar;
