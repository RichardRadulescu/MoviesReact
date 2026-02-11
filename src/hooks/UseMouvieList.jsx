import { useEffect, useMemo, useState } from "react";
import { useAsync } from "./UseAsync";


export function useMovieList(source) {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [sortMode, setSortMode] = useState(null); // "alpha" | "rating" | null
    const [page, setPage]= useState(1)
    const pageSize= 8

    /*          SIMULATE ERROR FROM BACKEND
    function loadMovies() {
        return (async () => {
         await new Promise(r => setTimeout(r, 0)); 
         throw new Error("Test error from useMovieList"); })(); 
    }
    const { run, loading, err } = useAsync(loadMovies, [source]);
    */
    function mapAnime(anime) {
        return {
            id: anime.mal_id,
            title: anime.title,
            image: anime.images?.jpg?.image_url || null,
            genre: anime.genres?.[0]?.name || "Unknown",
            rating: anime.score?.toString() || "N/A"
        };
    }


    const { run, loading, err } = useAsync(async () => {
        if (source === "fetch") {
            const res = await fetch('/movies/movies.json');
            return res.json();
        }
        if (source === "local") { 
            return JSON.parse(localStorage.getItem("watched") || "[]"); 
        }
        if (source === 'fetch-anime'){
            const url = new URL("https://api.jikan.moe/v4/anime"); 
            url.searchParams.set("page", 1);
            url.searchParams.set("limit", 25); 
            const res = await fetch(url);
            // special flag 
            const data = await res.json();
            return data.data.map(mapAnime);
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

    const pagedMovies = useMemo(()=>{
        if (!Array.isArray(visibleMovies)) return []
        const start = (page - 1) * pageSize
        return visibleMovies.slice(start, start + pageSize)
    },[visibleMovies, page])

    return { movies: pagedMovies, 
             page, totalPages: Math.ceil(visibleMovies/ pageSize), setPage,
             sortMode, setQuery, setSortMode,
             loading, err 
            };

}