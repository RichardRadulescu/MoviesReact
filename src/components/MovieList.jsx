import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import "../styles/movie-list.css"
import { useMovieList } from "../hooks/UseMouvieList"
import { useWatchList } from "../hooks/UseWatchList";
import { Loading } from "./Loading";
import { ErrorMessage } from "./Error";

export function MovieList({retrievalMethod}) {
    const { movies, sortMode, setQuery, setSortMode, loading, err } = useMovieList(retrievalMethod);
    const { _ ,toggleWatch, isWatched} =useWatchList()
    
    if (loading) return <Loading/>
    if (err) return <ErrorMessage message={err.message}/>

    return (
        <div className="movies-grid">
            <div className="movies-controls">
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <label htmlFor="search-movie"></label>
                    <input type="text" name="search-movie" placeholder="..."
                        onChange={e => setQuery(e.target.value)}></input>
                    <button type="submit">Search</button>
                </form>
                <div className="sort-buttons">
                    <button type="button"
                        className={sortMode === 'alpha' ? "active" : ""}
                        onClick={() => { setSortMode(sortMode === 'alpha' ? null : 'alpha') }}>Sort A-Z</button>
                    <button type="button"
                        className={sortMode === 'rating' ? "active" : ""}

                        onClick={() => { setSortMode(sortMode === 'rating' ? null : 'rating') }}>Sort rating</button>
                </div>
            </div>
            {movies.map((m) => {
                return <MovieCard movie={m} toggleWatched={toggleWatch} isWatched={isWatched} key={m.id} />
            })}
        </div>
    )
}