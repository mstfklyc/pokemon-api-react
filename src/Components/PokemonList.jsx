import PokemonContext from "../context/PokeContext";
import { useContext, useEffect } from "react";
import PokeItem from "./PokeItem";
import { AiOutlineToTop } from "react-icons/ai";
import spinnergif from "./assets/simple_pokeball.gif";
import colors from "../colors";

function PokemonList({ searchText, setShowNavbar }) {
  const {
    pokemons,
    getPokemons,
    loading,
    pokemon,
    setLoading,
    loadMorePokemons,
  } = useContext(PokemonContext);

  const filteredPokemons = pokemons.results.filter((pokemon) =>
    pokemon.name.includes(searchText?.toLowerCase())
  );

  function handleNavBar() {
    setShowNavbar(false);
  }

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      {loading ? ( // Show spinner if loading is true
        <img src={spinnergif}></img>
      ) : (
        // Değilse asıl içeriği göster.
        <div className="poke-container" onClick={handleNavBar}>
          {filteredPokemons.map((item, idx) => {
            return <PokeItem item={item} key={idx} colors={colors} />;
          })}
        </div>
      )}
      <button className="btn btn-load" onClick={loadMorePokemons}>
        Load More
      </button>
      <button className="btn-top" onClick={handleClick}>
        <AiOutlineToTop />
      </button>
    </>
  );
}

export default PokemonList;
