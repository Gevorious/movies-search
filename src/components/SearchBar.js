import { useEffect, useState } from "react";

const SearchBar = ({ query, onSearch }) => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    setTerm(query);
  }, [query]);

  return (
    <form onSubmit={(e) => onSearch(e, term)}>
      <div className="search-bar">
        <input
          name="search"
          type="text"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          autoFocus
          autoComplete="on"
        />
        <button>
          <span className="search-btn"></span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
