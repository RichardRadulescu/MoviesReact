import { useEffect, useState } from "react";
import { Link, useMatches, useParams } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { useWatchList } from "../hooks/UseWatchList";


function useSource() {
  const matches = useMatches();
  const match = matches.find(m => m.handle?.source);
  return match?.handle?.source ?? null;
}

function mapAnime(anime) {
  return {
    id: anime.mal_id,
    title: anime.title,
    image: anime.images?.jpg?.image_url || null,
    genre: anime.genres?.[0]?.name || "Unknown",
    rating: anime.score?.toString() || "N/A"
  };
}

export default function MovieDetails() {
  const { id } = useParams();
  const source = useSource();
  const { toggleWatch, isWatched } = useWatchList();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load ONE movie on mount
  useEffect(() => {
    async function load() {
      let data = [];

      if (source === "fetch") {
        const res = await fetch("/movies/movies.json");
        data = await res.json();
      }

      if (source === "local") {
        data = JSON.parse(localStorage.getItem("watched") || "[]");
      }

      if (source === "fetch-anime") {
        const url = new URL("https://api.jikan.moe/v4/anime");
        url.searchParams.set("page", 1);
        url.searchParams.set("limit", 25);
        const res = await fetch(url);
        const json = await res.json();
        data = json.data.map(mapAnime);
      }

      const found = data.find(m => String(m.id) === id);
      setMovie(found || null);
      setLoading(false);
    }

    load();
  }, [id, source]);

  if (loading) return <div>Loading…</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <>
        <MovieCard
        movie={movie}
        toggleWatched={toggleWatch}
        isWatched={isWatched}
        key={id}
        />  
        <Link to=".." style={{ 
            color: "black", 
            border: "3px solid black",
            borderRadius: "6px",
            padding: "6px 12px",
            textDecoration: "none"
        }}>← Back</Link>
    </>
  );
}
