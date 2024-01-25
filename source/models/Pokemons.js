import mongoose from "mongoose";

const pokemonsSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    pokedexNumber: { type: Number, unique: true, required: true },
    types: [{ type: String, required: true }],
  }
);

const pokemons = mongoose.model('pokemons', pokemonsSchema);

export default pokemons;