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
      <Navigation menu={['Home', 'Watched Movies']} setActiveMenu={setActiveMenu} />
      <main>
        {activeMenu === 'Home' && <MovieList/> }
        
      </main>
    </div>
  );
}

export default App;
