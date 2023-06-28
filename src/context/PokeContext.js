import { createContext, useEffect, useReducer, useState } from "react";
import PokeReducer from "./PokeReducer";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const initialState = {
    pokemons: { results: [] },
    pokemonList: [],
    pokemon: [],
    allPokemons: [],
    loading: true,
    btnLoading: false,
  };
  const [state, dispatch] = useReducer(PokeReducer, initialState);

  // Load More Pokemons

  const loadMorePokemons = async () => {
    setBtnLoading();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${state.pokemons.results.length}`
      );
      const data = await response.json();
      const newData = [];
      for (let i = 0; i < data.results.length; i++) {
        const pokemonResponse = await fetch(data.results[i].url);
        const pokemonData = await pokemonResponse.json();
        const { name, sprites, stats, types, weight } = pokemonData;
        const pokemonDatas = {
          name,
          image: sprites.other.dream_world.front_default,
          stats,
          types: types.map((type) => type.type),
          weight,
        };
        newData.push(pokemonDatas);
        console.log(pokemonDatas);
      }

      dispatch({ type: "LOAD_MORE_POKEMONS", payload: { results: newData } });
    } catch (error) {
      console.log(error);
    }
    setBtnLoadingFalse(false);
  };

  //Get Single Pokemon
  const getPokemon = async (name) => {
    setLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    dispatch({
      type: "GET_POKEMON",
      payload: data,
    });
    setLoading(false);
  };
  // Search Pokemons
  const searchPokemon = async (text) => {
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `${process.env.POKEMON_API_URL}/pokemon/${params}`
    );
    const data = await response.json();
    dispatch({
      type: "GET_POKEMON",
      payload: data,
    });
    setLoading(false);
  };

  // Get pokemons and details and put one array

  const getPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
    const data = await response.json();
    const pokemonDetails = [];
    const goNextPage = await fetch(data.next);
    const nextData = await goNextPage.json();
    const impData = [];
    for (const pokemon of data.results) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      const { name, sprites, stats, types, weight } = pokemonData;

      const pokemonDatas = {
        name,
        image: sprites.other.dream_world.front_default,
        stats,
        types: types.map((type) => type.type),
        weight,
      };
      console.log(pokemonDatas);
      pokemonDetails.push(pokemonDatas);
    }
    for (const next of nextData.results) {
      const nextResponse = await fetch(next.url);
      const nextData = await nextResponse.json();
      const { name, sprites, stats, types, weight } = nextData;
      const pokemonData = {
        name,
        image: sprites.other.dream_world.front_default,
        stats,
        types: types.map((type) => type.type),
        weight,
      };
      pokemonDetails.push(pokemonData);
      console.log(nextData);
    }
    const allPokemonData = {
      ...data,
      results: pokemonDetails,
    };

    dispatch({
      type: "GET_POKEMONS",
      payload: allPokemonData,
    });
    setLoading();
  };
  // Get Pokemons when the page loads
  useEffect(() => {
    getPokemons();
  }, []);

  // Functions
  const setBtnLoading = () => {
    dispatch({ type: "SETBTN_LOADING" });
  };

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  // Pokemon Clear State

  const clearSinglePokemon = () => {
    dispatch({ type: "CLEAR_POKEMON" });
  };

  const setBtnLoadingFalse = () => {
    dispatch({
      type: "SETBTNFALSE_LOADING",
    });
  };
  return (
    <PokemonContext.Provider
      value={{
        pokemons: state.pokemons,
        pokemon: state.pokemon,
        loading: state.loading,
        pokemonList: state.pokemonList,
        searchPokemon,
        getPokemons,
        setLoading,
        loadMorePokemons,
        clearSinglePokemon,
        getPokemon,
        btnLoading: state.btnLoading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext;
