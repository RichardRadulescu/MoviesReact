import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import "../styles/movie-list.css"

export function MovieList(){
    const [movies, setMovies]= useState([])

    useEffect(()=>{
        async function getMovies() {
            const res = await fetch('/movies/movies.json')
            const data = await res.json()
            setMovies(data)
        }
        getMovies()
    }, [])

    return (
        <div className="movies-grid">
            {movies.map((m)=>{
               return <MovieCard movie={m} key={m.id}/> 
            })}
        </div>
    )
}