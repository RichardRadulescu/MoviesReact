import { useState } from "react";
import { MovieList } from "./components/MovieList";
import { Navigation } from "./components/Navigation";

function App() {
  const [activeMenu, setActiveMenu]= useState('Home')


  return (
    <div>
      <header>
       Movie App
       
      </header>
      <Navigation menu={['Home', 'Anime', 'Watched Movies']} setActiveMenu={setActiveMenu} />
      <main>
        {activeMenu === 'Home' && <MovieList retrievalMethod={"fetch"}/> }
        {activeMenu === 'Watched Movies' && <MovieList retrievalMethod={"local"}/> }
        {activeMenu === 'Anime' && <MovieList retrievalMethod={"fetch-anime"} />}
      </main>
    </div>
  );
}

export default App;
