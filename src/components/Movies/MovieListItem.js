const MovieListItem = ({ movie }) => {
  return (
    <div className="movie">
      <div className="movie-img">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt=""
        />
        <p className="review">{movie.vote_average}</p>
        <p className="overview">
          {movie.overview.slice(0, 100)}
          {movie.overview.length > 100 && <span>...</span>}
        </p>
      </div>
      <div className="info">
        <p className="title">
          {movie.title.slice(0, 20)}
          {movie.title.length > 20 && (
            <>
              <span>...</span>
              <span className="full-title">{movie.title}</span>
            </>
          )}
        </p>
        <p className="release">
          Released:{" "}
          <span>
            {new Date(movie.release_date).toLocaleString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MovieListItem;
