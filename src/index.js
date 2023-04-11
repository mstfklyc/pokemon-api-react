import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import PokemonList from "./Components/PokemonList";
import Navbar from "./pages/Navbar";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonProvider } from "./context/PokeContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PokemonProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PokemonProvider>
);
