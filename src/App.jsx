import { useState } from "react";
import { MovieList } from "./components/MovieList";
import { Navigation } from "./components/Navigation";
import { createBrowserRouter, Outlet } from "react-router-dom";


function App() {
  
  return (
    <div>
      <header>
          Movie App
      </header>
      <Navigation/>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default App;
