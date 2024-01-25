import express from "express";
import users from "./userRoutes.js";
import pokemons from "./pokemonRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Bem vindo a Pokedex"});
    })
    
    app.use(
        express.json(),
        users,
        pokemons
    )
}

export default routes;