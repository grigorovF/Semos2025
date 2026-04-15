import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

export function MovieItem({ movie }) {
    return (
        <div className="card">
            <img src={movie.imgUrl} className="card-img" />

            <div className="card-body">
                <h2>{movie.name}</h2>

                <p><b>Year:</b> {movie.date}</p>
                <p><b>Genre:</b> {movie.genre}</p>
                <p className="plot">{movie.plot}</p>

                <a href={movie.imdbLink} target="_blank" rel="noreferrer">
                    IMDb Link
                </a>
            </div>
        </div>
    );
}

MovieItem.propTypes = {
    movie: PropTypes.shape({
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        plot: PropTypes.string.isRequired,
        imdbLink: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired
    })
};