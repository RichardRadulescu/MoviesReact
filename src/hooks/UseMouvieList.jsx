import { useEffect, useMemo, useState } from "react";


export function useMovieList(source) {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [sortMode, setSortMode] = useState(null); // "alpha" | "rating" | null

    
    useEffect(() => {
        if (source === "fetch") { 
            fetch('/movies/movies.json')
            .then(res=> res.json())
            .then(setMovies); 
        }
        else if (source === "local") {
            const stored = JSON.parse(localStorage.getItem("watched") || "[]");
            setMovies(stored);
        }
    }, [source]);

    const visibleMovies = useMemo(() => {
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

    return { movies: visibleMovies, sortMode, setQuery, setSortMode, };

}