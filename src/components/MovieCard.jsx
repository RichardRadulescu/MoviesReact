import { useEffect, useState } from "react"
import "../styles/movie-card.css"

export function MovieCard({movie, toggleWatched, isWatched}){
     
    return (
        <div className="movie-card">
            <h1>{movie.title}</h1>
            <p>Category: {movie.genre}</p>
            <p>Score: {movie.rating}</p>
            <img src={`/movies/images/${movie.image}`} alt={movie.title} />

            <button onClick={()=> toggleWatched(movie)}
                className={isWatched(movie)? 'active': null }
            >
                {isWatched(movie)? "Remove from Watchlist" : "Add Watchlist"}
                </button>
        </div>
    )
}