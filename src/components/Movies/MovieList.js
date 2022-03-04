import { useEffect, useMemo, useState } from "react";

import axios from "axios";
import MovieListItem from "./MovieListItem";
import { useHistory, useLocation } from "react-router";
import SearchBar from "../SearchBar";
import Spinner from "../utils/Spinner";

const MovieList = () => {
  const [data, setData] = useState(null);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const query = useQuery();

  const getAllMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=f5147c914f429162ec4eca5b1294eef7&language=en-US&page=1"
      );
      setData(response.data.results);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const filteredMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=f5147c914f429162ec4eca5b1294eef7&language=en-US&page=1&query=${term}`
      );
      setData([...response.data.results]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const logSearchTerm = async (term) => {
    try {
      axios.post(
        "https://database-9ce06-default-rtdb.europe-west1.firebasedatabase.app/tags.json",
        { tag: term }
      );
    } catch (err) {
      console.log(err);
    }
  };

  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    query.get("search") ? setTerm(query.get("search")) : setTerm("");
  }, [query.get("search")]);

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
    term && logSearchTerm(term);
    setTerm(term);
  };

  return (
    <div className="movie-list container">
      <SearchBar query={query.get("search")} onSearch={onSearch} />
      {loading ? (
        <div className="spinner-wrapper">
          <Spinner />
        </div>
      ) : (
        <div className="movies-grid">
          {data &&
            data.map((movie) => <MovieListItem movie={movie} key={movie.id} />)}
        </div>
      )}
    </div>
  );
};

export default MovieList;
