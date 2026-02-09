import { useEffect, useState } from "react"
import "../styles/movie-card.css"

export function MovieCard({movie}){
    const [watched, setWatched]= useState(false)
     
    //useEffect() -> get local storage
    const handleWatched= (prev)=>{ setWatched(!watched)
        //set local storage
    }
    return (
        <div className="movie-card">
            <h1>{movie.title}</h1>
            <p>Category: {movie.genre}</p>
            <p>Score: {movie.rating}</p>
            <img src={`/movies/images/${movie.image}`} alt={movie.title} />
            <button onClick={handleWatched}>Add Watchlist</button>
        </div>
    )
}