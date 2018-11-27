const express = require('express');
const app = express();

const pokemon = [
    {
        id: 1,
        name: 'pikachu'
    },
    {
        id: 2,
        name: 'raichu'
    },
    {
        id: 53,
        name: 'squirtle'
    },
    {
        id: 4,
        name: 'bulbazer'
    }
];

// middleware allows access to the body of the file
app.use(express.json());

// Setting up routes

// get request to '/' ie home
app.get('/', (req, res) => {
    return res.send('hey there, love API');
});

// get end point for /pokemon
app.get('/pokemon', (req, res) => {
    return res.send(pokemon)
})

app.get('/pokemon/:id', (req, res) => {
    console.log(req.params.id);
    const id = parseInt(req.params.id);
    const poke = pokemon.find(p => p.id === id);
    if (!poke) {
        // 200 status - ok
        // 300 status - redirected
        // 400 status - user error
        // 500 status - server error
        return res.status(404).send('Pokemon not found :(' )
    }
    return res.send(poke);
})

app.post('/pokemon', (req, res) => {
    // ADD A NEW POKEMON TO THE ARRAY
    // 1. get params from req body
    const id = req.body.id;
    const name = req.body.name;
    // 2. add to the array
    const poke = {id: id, name: name};
    pokemon.push(poke);
    // 3. send new pokemon as response
    return res.send(poke)
})

// app to listen to a specific port
app.listen(5000, () => {
    console.log('listening on port 5000')
})