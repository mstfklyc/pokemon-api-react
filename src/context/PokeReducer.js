const PokeReducer = (state, action) => {
  switch (action.type) {
    case "GET_POKEMON":
      return {
        ...state,
        pokemon: action.payload,
        loading: false,
      };
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        loading: true,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "LOAD_MORE_POKEMONS":
      return {
        ...state,
        pokemons: {
          ...action.payload.results,
          results: [...state.pokemons.results, ...action.payload.results],
        },
      };
    default:
      return state;
  }
};
export default PokeReducer;
