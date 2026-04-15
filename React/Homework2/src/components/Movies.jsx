import React from 'react';
import { movies } from '../data/movies';
import { MovieItem } from './MovieItem';
import './Movie.css';

export function Movies() {
    return (
        <div className="container">
            {movies.map((m, i) => (
                <MovieItem key={i} movie={m} />
            ))}
        </div>
    );
}