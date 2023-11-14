# Basic Express

Basic express.js project with basic routes:
* Express
* Joi
* Fs

---

## URL

_Server_
```
http://localhost:3000
```
---


## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## RESTful endpoints

### POST /pokemons/catch/:name

> Catch Pokemon

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (201)_
```
{
    "message": "Pokemon berhasil di tangkap!",
    "catchPokemon": {
        "id": "33d56b1d-f87e-4a3f-a103-b8f563f00651",
        "name": "bulbasaur"
    }
}

```

_Response (400 - Failed Post pokemon)_
```
{
    "message": "Pokemon gagal di tangkap, coba lagi!"
}
```

_Response (404 - Validation Error)_
```
{
    "message": "Pokemon Not Found"
}
```

---

### GET /pokemons

> Get all pokemons

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
]
```

---

### GET /pokemons/:name

 > Get pokemon by name

_Request Params_

```
/<pokemon_name>/

```

_Request Header_

```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "dataPokemon": {
        "name": "bulbasaur",
        "ability": "overgrow",
        "height": 7,
        "move": "razor-wind",
        "stats": {
            "hp": 45,
            "attack": 49,
            "defense": 49,
            "special-attack": 65,
            "special-defense": 65,
            "speed": 45
        },
        "weight": 69
    }
}
```

_Response (404)_
```
{
    "message": "Pokemon Not Found"
}
```

---
### GET /myPokemons

> Get all my pokemon list

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "myPokemons": [
        {
            "id": "86c1b87f-bb94-4de8-be6d-5efe0867fcf1",
            "name": "bulbasaur-2",
            "renameNum": 4
        },
        {
            "id": "48d2e751-7d4c-41e9-a001-3237059da0cf",
            "name": "chardelahu-144",
            "renameNum": 13
        },
        {
            "id": "94060332-784c-40f7-9e46-7cce061b5852",
            "name": "chaliz-89",
            "renameNum": 12
        },
        {
            "id": "33d56b1d-f87e-4a3f-a103-b8f563f00651",
            "name": "bulbasaur"
        }
    ]
}
```

---
### PUT /myPokemons/:id

> Rename pokemon by id

_Request Params_
```
/<pokemons_id>/
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name" : "<name>",
}
```

_Response (200)_
```
{
    "message": "Nama Pokemon berhasil dirubah menjadi chalizard-233 "
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" is not allowed to be empty"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Pokemon Not Found"
}
```

---

### DELETE /myPokemons/:id

> Release pokemon by id

_Request Params_
```
/<pokemons_id>/
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Pokemon berhasil di hapus"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Pokemon Not Found"
}
```

---
