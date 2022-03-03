import { useEffect, useMemo, useState } from "react";

import axios from "axios";
import MovieListItem from "./MovieListItem";
import { useHistory, useLocation } from "react-router";
import SearchBar from "../SearchBar";

const MovieList = () => {
  const [data, setData] = useState(null);
  const [term, setTerm] = useState("");
  const history = useHistory();

  const getAllMovies = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=f5147c914f429162ec4eca5b1294eef7&language=en-US&page=1"
    );
    setData(response.data.results);
  };

  const filteredMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=f5147c914f429162ec4eca5b1294eef7&language=en-US&page=1&query=${term}`
    );
    setData([...response.data.results]);
  };

  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  useEffect(() => {
    query.get("search") && setTerm(query.get("search"));
  }, [query]);

  useEffect(() => {
    if (term) {
      filteredMovies();
    } else {
      getAllMovies();
    }
  }, [term]);

  const onSearch = (e, term) => {
    e.preventDefault();
    history.push({ search: `?search=${term}` });
    setTerm(term);
  };

  return (
    <div className="movie-list container">
      <SearchBar query={query.get("search")} onSearch={onSearch} />
      <div className="movies-grid">
        {data &&
          data.map((movie) => <MovieListItem movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
};

export default MovieList;
