import { useEffect, useMemo, useState } from "react";
import { useAsync } from "./UseAsync";


export function useMovieList(source) {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [sortMode, setSortMode] = useState(null); // "alpha" | "rating" | null


    /*          SIMULATE ERROR FROM BACKEND
    function loadMovies() {
        return (async () => {
         await new Promise(r => setTimeout(r, 0)); 
         throw new Error("Test error from useMovieList"); })(); 
    }
    const { run, loading, err } = useAsync(loadMovies, [source]);
    */
    const { run, loading, err } = useAsync(async () => {
        if (source === "fetch") {
            const res = await fetch('/movies/movies.json');
            return res.json();
        }
        if (source === "local") { 
            return JSON.parse(localStorage.getItem("watched") || "[]"); 
        }
    }, [source])

    useEffect(() => {
        run().then(data =>{
            if (data) setMovies(data)
        })
    }, [run]);


    const visibleMovies = useMemo(() => {
        if (!Array.isArray(movies)) return []

        let list = [...movies]; if (query) {
            list = list.filter(m => m.title.toLowerCase()
                .startsWith(query.toLowerCase()));
        }
        if (sortMode === "alpha") {
            list.sort((a, b) => a.title.localeCompare(b.title));
        }
        if (sortMode === "rating") {
            list.sort((a, b) => a.rating - b.rating);
        }
        return list;
    }, [movies, query, sortMode]);

    return { movies: visibleMovies, sortMode, setQuery, setSortMode, loading, err };

}