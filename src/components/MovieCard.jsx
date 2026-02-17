import { useEffect, useState } from "react"
import "../styles/movie-card.css"

export function MovieCard({movie, toggleWatched, isWatched}){
     
    return (
        <div className="movie-card">
            <h1>{movie.title}</h1>
            <p>Category: {movie.genre}</p>
            <p>Score: {movie.rating}</p>
            <img src={ movie.image.startsWith("http") ?
                            movie.image : 
                            `/movies/images/${movie.image}` } alt={movie.title}
                 loading="lazy" className="movie-img"        
                        />

            <button onClick={(e)=> {e.preventDefault(); toggleWatched(movie)}}
                className={isWatched(movie)? 'active': null }
            >
                {isWatched(movie)? "Remove from Watchlist" : "Add Watchlist"}
                </button>
        </div>
    )
}