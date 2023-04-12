import PokemonList from "./Components/PokemonList";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import SinglePokemonPage from "./Components/SinglePokemonPage";
function App({ hideNavBar }) {
  const [searchText, setSearchText] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  console.log(showNavbar);

  function lowerCase() {
    searchText.toLowerCase();
  }
  lowerCase();

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PokemonList
              setShowNavbar={setShowNavbar}
              searchText={searchText}
            />
          }
        />
        <Route
          path="/navbar"
          element={<Navbar setSearchText={setSearchText} />}
        />

        <Route path="/footer" element={<Footer />} />
        <Route
          path="/pokemon/:name"
          showNavbar={showNavbar}
          setShowNavbar={setShowNavbar}
          element={<SinglePokemonPage setShowNavbar={setShowNavbar} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
