import PokemonContext from "../context/PokeContext";
import { useContext, useEffect } from "react";
import PokeItem from "./PokeItem";
import { AiOutlineToTop } from "react-icons/ai";
import spinnergif from "./assets/spinner.gif";
import colors from "../colors";
import Spinner from "./Spinner";
function PokemonList({ searchText, setShowNavbar }) {
  const { pokemons, loading, btnLoading, loadMorePokemons } =
    useContext(PokemonContext);

  const filteredPokemons = pokemons.results.filter((pokemon) =>
    pokemon?.name?.includes(searchText?.toLowerCase())
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
        <Spinner />
      ) : (
        // if loading not true , then show the real content
        <div className="poke-container" onClick={handleNavBar}>
          {filteredPokemons.map((item, idx) => {
            return <PokeItem item={item} key={idx} colors={colors} />;
          })}
        </div>
      )}
      <button className="btn btn-load" onClick={loadMorePokemons}>
        {btnLoading ? <img src={spinnergif} width="30px"></img> : "Load More"}
      </button>
      <button className="btn-top" onClick={handleClick}>
        <AiOutlineToTop />
      </button>
    </>
  );
}

export default PokemonList;
