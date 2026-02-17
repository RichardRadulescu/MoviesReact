import { Link } from "react-router-dom"
import "../styles/navigation.css"
export function Navigation({ menu, setActiveMenu }) {

    return (
        <nav>
            <Link to="/movies">Movies</Link>
            <Link to="/anime">Anime</Link>
            <Link to="/watched-movies">Watched Movies</Link>
        </nav>
    )
}