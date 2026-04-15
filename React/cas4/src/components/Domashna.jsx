

export const Domashna = ({movies}) => {

    return(
        <div id='domashna'>
            {movies.map((movie,i)=>{
                return(
                    <div key={i}>
                        <h3><span>Title: </span> {movie.name}</h3>
                        <p><span>Release Date: </span> {movie.releaseDate}</p>
                        <p><span>Genre: </span> {movie.genre}</p>
                        <p><span>Plot: </span> {movie.plot}</p>
                        <a target="_blank" href={movie.imdbLink}>Go to Imdb</a>
                        <br/>
                        <img src={movie.imgUrl} alt={movie.name} width={250} height={350}/>
                        <hr/>
                    </div>    
                )
            })}
        </div>
    )
}