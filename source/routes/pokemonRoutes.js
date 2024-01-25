import express from "express";
import pokemonsController from "../controllers/pokemonsController.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');

  if (!token) {
    console.log('Token não fornecido.');
    return res.status(401).send({ message: 'Token não fornecido.' });
  }

  console.log('Token recebido pelo servidor:', token);

  const secret = process.env.SECRET || 'DefaultSecretValue';

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error('Erro ao verificar o token:', err);
      return res.status(401).send({ message: 'Token inválido.' });
    }
  
    console.log('Token decodificado:', decoded);
  
    req.user = decoded;
    next();
  });
  
};

router
  .get("/pokemons", authenticateUser, pokemonsController.listPokemons)
  .get("/pokemons/name/:name", authenticateUser, pokemonsController.listPokemonByName)
  .get("/pokemons/types/:types", authenticateUser, pokemonsController.listPokemonsByTypes)
  .get("/pokemons/:pokedexNumber", authenticateUser, pokemonsController.listPokemonById)
  .post("/pokemons", authenticateUser, pokemonsController.registerPokemon)
  .put("/pokemons/:pokedexNumber", authenticateUser, pokemonsController.updatePokemon)

export default router;