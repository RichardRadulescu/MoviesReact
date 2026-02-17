import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MovieList } from "./components/MovieList.jsx";


const router= createBrowserRouter([
  { path: "/", Component: App,
    children:[
        {index: true, element: <MovieList retrievalMethod={"fetch"}/> },
        {path:"/movies", element: <MovieList retrievalMethod={"fetch"}/> },
        {path:"/watched-movies", element: <MovieList retrievalMethod={"local"}/>},
        {path:"/anime", element: <MovieList retrievalMethod={"fetch-anime"}/>}
    ]
  },
  
])



const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
    <RouterProvider router={router}/>
);
