import { useEffect, useMemo, useState } from "react";
import { useAsync } from "./UseAsync";
import { useSearchParams } from "react-router-dom";

export function useMovieList(source) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [movies, setMovies] = useState([]);
    const query = searchParams.get("query") ?? ""
    const sortMode = searchParams.get("sort") ?? null
    const page = Number(searchParams.get("page") ?? 1)
    const pageSize = 8

    function updateParam(key, value) {
        const params = new URLSearchParams(searchParams);
        if (value === null || value === "" || value === undefined) { params.delete(key); }
        else { params.set(key, value); }
        setSearchParams(params);
    } 
    const setPage = (p) => updateParam("page", p);
    const setSortMode = (m) => updateParam("sort", m);
    const setQuery = (q) => updateParam("query", q);


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
    function loadMovies() {
        if (source === "fetch") {
            return fetch('/movies/movies.json').then(r => r.json());
        }
        if (source === "local") {
            return Promise.resolve(JSON.parse(localStorage.getItem("watched") || "[]"));
        }
        if (source === "fetch-anime") {
            const url = new URL("https://api.jikan.moe/v4/anime");
            url.searchParams.set("page", 1);
            url.searchParams.set("limit", 25);
            return fetch(url)
                .then(r => r.json())
                .then(data => data.data.map(mapAnime));
        }
    }


    const { run, loading, err } = useAsync( loadMovies, [source])

    useEffect(() => {
        run().then(data => {
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

    const pagedMovies = useMemo(() => {
        if (!Array.isArray(visibleMovies)) return []
        const start = (page - 1) * pageSize
        return visibleMovies.slice(start, start + pageSize)
    }, [visibleMovies, page])

    return {
        movies: pagedMovies,
        page, totalPages: Math.ceil(visibleMovies.length / pageSize), setPage,
        sortMode, setQuery, setSortMode,
        loading, err
    };

}