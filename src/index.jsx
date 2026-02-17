import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieList } from "./components/MovieList.jsx";
import MovieDetails from "./components/MovieDetails.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      // MOVIES
      {
        path: "movies",
        handle: { source: "fetch" },
        children: [
          { index: true, element: <MovieList retrievalMethod="fetch" /> },
          { path: ":id", element: <MovieDetails /> }
        ]
      },

      // WATCHED MOVIES
      {
        path: "watched-movies",
        handle: { source: "local" },
        children: [
          { index: true, element: <MovieList retrievalMethod="local" /> },
          { path: ":id", element: <MovieDetails /> }
        ]
      },

      // ANIME
      {
        path: "anime",
        handle: { source: "fetch-anime" },
        children: [
          { index: true, element: <MovieList retrievalMethod="fetch-anime" /> },
          { path: ":id", element: <MovieDetails /> }
        ]
      }
    ]
  }
]);




const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
    <RouterProvider router={router}/>
);
