//import React from "react";
//import PropTypes from "prop-types";
import "./Movie.css";

export function MovieCard({ movie }) {
  return (
    <div className="card">
      <img src={movie.imgUrl} className="card-img" />

      <div className="card-body">
        <h2>{movie.name}</h2>

        <p>
          <b>Year:</b> {movie.date}
        </p>
        <p>
          <b>Genre:</b> {movie.genre}
        </p>
        <p className="plot">{movie.plot}</p>

        <a href={movie.imdbLink} target="_blank" rel="noreferrer">
          IMDb Link
        </a>
      </div>
    </div>
  );
}
