import express from "express";
import pokemonsController from "../controllers/pokemonsController.js";
import authenticateUser from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .get("/pokemons", authenticateUser, pokemonsController.listPokemons)
  .get("/pokemons/name/:name", authenticateUser, pokemonsController.listPokemonByName)
  .get("/pokemons/types/:types", authenticateUser, pokemonsController.listPokemonsByTypes)
  .get("/pokemons/:pokedexNumber", authenticateUser, pokemonsController.listPokemonById)
  .post("/pokemons", authenticateUser, pokemonsController.registerPokemon)
  .put("/pokemons/:pokedexNumber", authenticateUser, pokemonsController.updatePokemon)

export default router;