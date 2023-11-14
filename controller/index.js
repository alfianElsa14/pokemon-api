import axios from "axios"
import { v4 as uuidv4 } from 'uuid'
import { handleServerError, handleClientError } from "../helper/errorHandler.js"
import { loadData, storeData } from "../helper/databaseHelper.js"
import { fibonacci, isPrime } from "../helper/number.js"
import joi from 'joi'

export const getPokemon = async (req, res) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`)
        const allPokemons = response.data.results

        res.status(200).json(allPokemons)
    } catch (error) {
        console.log(error);
        return handleServerError(res);
    }
}

export const getPokemonDetail = async (req, res) => {
    try {
        const { name } = req.params
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

        const isValidate = response.data.forms.some((el) => el.name.toLowerCase() === name.toLowerCase())

        const statsPoke = response.data.stats.reduce((acc, el) => {
            acc[el.stat.name] = el.base_stat;
            return acc;
        }, {});

        const dataPokemon = {
            name: response.data.forms[0].name,
            ability: response.data.abilities[0].ability.name,
            height: response.data.height,
            move: response.data.moves[0].move.name,
            stats: statsPoke,
            weight: response.data.weight

        }

        if (isValidate) {
            res.status(200).json({ dataPokemon })
        }

    } catch (error) {
        console.log(error.response);
        if (error.response.status === 404) {
            return handleClientError(res, 404, 'Pokemon Not Found')
        }
        return handleServerError(res);
    }
}

export const catchPokemon = async (req, res) => {
    try {
        const { name } = req.params
        const data = loadData()
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

        const isSuccessful = Math.random() >= 0.5;

        if (isSuccessful) {
            const catchPokemon = {
                id: uuidv4(),
                name: response.data.forms[0].name
            }

            data.myPokemons.push(catchPokemon)

            storeData(data)

            return res.status(201).json({ message: 'Pokemon berhasil di tangkap!', catchPokemon })
        } else {
            return res.status(400).json({ message: `Pokemon gagal di tangkap, coba lagi!` })
        }
    } catch (error) {
        console.log(error.response);
        if (error.response.status === 404) {
            return handleClientError(res, 404, 'Pokemon Not Found')
        }
        return handleServerError(res);
    }
}

export const getAllMyPoke = async (req, res) => {
    try {
        const data = loadData()
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return handleServerError(res);
    }

}

export const deleteMyPoke = async (req, res) => {
    try {
        const { id } = req.params
        const data = loadData()

        const releasedPokemon = data.myPokemons.find((el) => el.id.toLowerCase() === id.toLowerCase());

        if (!releasedPokemon) {
            return handleClientError(res, 404, 'Pokemon Not Found')
        }

        const randomNumber = Math.floor(Math.random() * 100) + 1

        const isSuccess = isPrime(randomNumber)

        if (isSuccess) {
            const filtered = data.myPokemons.filter((el) => el.id.toLowerCase() !== id.toLowerCase());

            data.myPokemons = filtered

            storeData(data)

            return res.status(200).json({ message: 'Pokemon berhasil di hapus' })
        } else {
            return res.status(400).json({ success: false, message: 'Pokemon gagal di lepas karena angka bukan prima.' });
        }

    } catch (error) {
        console.log(error);
        return handleServerError(res);
    }
}


export const renamePokemon = async (req, res) => {
    try {
        const { id } = req.params
        const data = loadData()
        const newData = req.body

        const dataPoke = data.myPokemons.find((el) => el.id.toLowerCase() === id.toLowerCase());

        if (!dataPoke) {
            return handleClientError(res, 404, 'Pokemon Not Found')
        }

        const schema = joi.object({
            id: dataPoke.id,
            name: joi.string().required()
        })

        const { error } = schema.validate(newData)

        if (error) {
            return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message });
        }

        const name = dataPoke.name.split('-');
        const renameNum = dataPoke.renameNum || 0;

        const newName = `${newData.name}-${name[1] ? fibonacci(renameNum) : 0}`;
        dataPoke.name = newName;
        dataPoke.renameNum = renameNum + 1;

        storeData(data)

        return res.status(201).json({ message: `Nama Pokemon berhasil dirubah menjadi ${dataPoke.name} ` })
    } catch (error) {
        console.log(error);
        return handleServerError(res);
    }

}


