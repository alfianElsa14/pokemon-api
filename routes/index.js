import express from 'express';
import { catchPokemon, deleteMyPoke, getAllMyPoke, getPokemon, getPokemonDetail, renamePokemon } from '../controller/index.js';
const router = express.Router()

router.get('/pokemons', getPokemon)
router.post('/pokemons/catch/:name', catchPokemon)
router.get('/pokemons/:name', getPokemonDetail)

router.get('/myPokemons', getAllMyPoke)
router.put('/myPokemons/:id', renamePokemon)
router.delete('/myPokemons/:id', deleteMyPoke)

export default router;