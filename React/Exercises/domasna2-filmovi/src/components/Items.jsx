import './Movie.css';
import {MovieCard} from './MovieCard';
import {movies} from '../data/movies'

export function Items(){
    return (
        <div className='container'>
            {movies.map((m, i) => {
                return(
                <MovieCard key={i} movie={m}/>
            )
            })}
        </div>
    )
}