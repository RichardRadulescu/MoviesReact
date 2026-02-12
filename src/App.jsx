import { useState } from "react";
import { MovieList } from "./components/MovieList";
import { Navigation } from "./components/Navigation";

function App() {
  const [activeMenu, setActiveMenu]= useState('Movies')


  return (
    <div>
      <header>
       Movie App
       
      </header>
      <Navigation menu={['Movies', 'Anime', 'Watched Movies']} setActiveMenu={setActiveMenu} />
      <main>
        {activeMenu === 'Movies' && <MovieList retrievalMethod={"fetch"}/> }
        {activeMenu === 'Watched Movies' && <MovieList retrievalMethod={"local"}/> }
        {activeMenu === 'Anime' && <MovieList retrievalMethod={"fetch-anime"} />}
      </main>
    </div>
  );
}

export default App;
