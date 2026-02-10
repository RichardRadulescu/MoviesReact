import { useEffect, useState } from "react";

export function useWatchList(){
    const [watchedMovies, setWatchedMovies] = useState(()=>{

        return JSON.parse(localStorage.getItem('watched')) || []
    })

    const toggleWatch = (movie) =>{
        setWatchedMovies( prev=>{
            const found= prev.some(m => m.id === movie.id)
            const updatedMovies= found ? 
                prev.filter(m => m.id !== movie.id) :
                [...prev, movie]
            
            localStorage.setItem('watched', JSON.stringify(updatedMovies))
            return updatedMovies
        })
    }
    const isWatched = (movie)=> watchedMovies.some(m => m.id === movie.id)

    return {watchedMovies, toggleWatch, isWatched}
}