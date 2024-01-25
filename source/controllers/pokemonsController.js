import pokemons from "../models/Pokemons.js";

class pokemonsController {

    static listPokemons = (req, res) => {
        pokemons.find()
            .exec()
            .then(pokemons => {
                res.status(200).json(pokemons);
            })
            .catch(error => {
                res.status(500).json({ error: 'Ocorreu um erro ao buscar os pokemons.' });
            });
    };

    static registerPokemon = (req, res) => {
        const token = req.headers.authorization;

        let pokemon = new pokemons(req.body);

        pokemon.save()
            .then(() => {
                res.status(201).send(pokemon.toJSON());
            })
            .catch((err) => {
                res.status(500).send({ message: `${err.message} - Falha ao cadastrar pokemon` });
            });
    }

    static updatePokemon = (req, res) => {
        const pokedexNumber = req.params.pokedexNumber;

        pokemons.findOneAndUpdate({ pokedexNumber: pokedexNumber }, { $set: req.body }, { new: true })
            .then((pokemon) => {
                if (!pokemon) {
                    res.status(400).send({ message: 'Pokemon não encontrado com o número da Pokédex fornecido.' });
                } else {
                    res.status(200).send({ message: 'Pokemon atualizado com sucesso', pokemon });
                }
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
    }

    static listPokemonById = (req, res) => {
        const pokedexNumber = req.params.pokedexNumber;

        pokemons.findOne({ pokedexNumber: pokedexNumber })
            .exec()
            .then((pokemon) => {
                if (!pokemon) {
                    res.status(400).send({ message: 'ID do pokemon não encontrado.' });
                } else {
                    res.status(200).send(pokemon);
                }
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
    };

    static listPokemonByName = (req, res) => {
        const pokemonName = req.params.name;

        pokemons.findOne({ name: { $regex: new RegExp(pokemonName, 'i') } })
            .exec()
            .then((pokemon) => {
                if (!pokemon) {
                    res.status(400).send({ message: 'Pokemon não encontrado com o nome fornecido.' });
                } else {
                    res.status(200).send(pokemon);
                }
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
    };

    static listPokemonsByTypes = (req, res) => {
        const types = req.params.types.split(',');

        pokemons.find({ types: { $all: types } })
            .exec()
            .then((pokemons) => {
                if (pokemons.length === 0) {
                    res.status(400).send({ message: 'Nenhum Pokémon encontrado com os tipos fornecidos.' });
                } else {
                    res.status(200).json(pokemons);
                }
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
    };

}

export default pokemonsController;