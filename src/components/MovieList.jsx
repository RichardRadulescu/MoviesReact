import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import "../styles/movie-list.css"

export function MovieList(){
    const [movies, setMovies]= useState([])
    const [query, setQuery]= useState('')
    const [isSortedAlphabetical, setIsSortedAlphabetical] = useState(false)
    const [isSortedRating, setIsSortedRating] = useState(false)


    let mutatedMovies= movies.filter((movie)=> movie.title.toLowerCase().startsWith(query.toLowerCase()))
    
    if (isSortedAlphabetical)
        mutatedMovies= [...mutatedMovies].sort((m1,m2)=> m1.title.localeCompare(m2.title))

    if (isSortedRating)
        mutatedMovies= [...mutatedMovies].sort((m1,m2)=> m1.rating - m2.rating)

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
            <div className="movies-controls">
                <form onSubmit={(e)=>{e.preventDefault()}}>
                    <label htmlFor="search-movie"></label>
                    <input type="text" name="search-movie" placeholder="..."
                        onChange={e => setQuery(e.target.value)}></input>
                    <button type="submit">Search</button>
                </form>
                <div className="sort-buttons">
                    <button type="button"
                        className={isSortedAlphabetical ? "active" : ""}
                    
                        onClick={()=>{setIsSortedAlphabetical(prev=> !prev)
                        setIsSortedRating(false)
                    }}>Sort A-Z</button>
                    <button type="button"
                        className={isSortedRating ? "active" : ""} 
                    
                        onClick={()=>{setIsSortedRating(prev=> !prev)
                        setIsSortedAlphabetical(false)
                    }}>Sort rating</button>
                </div>
            </div>
            {mutatedMovies.map((m)=>{
               return <MovieCard movie={m} key={m.id}/> 
            })}
        </div>
    )
}