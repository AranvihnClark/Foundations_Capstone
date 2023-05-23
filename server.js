// ***Imports/Requires***
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const { SERVER_PORT } = process.env;
const { seed } = require('./controller/seed.js');
const { 
    joesAction,
    outcome,
    getTravelers,
    getGoodTravelers, 
    getEvilTravelers, 
    getUnsureTravelers, 
    addGoodTravelers, 
    addEvilTravelers, 
    addUnsureTravelers, 
    deleteGEUTravelers,
    getJoe,
    updateJoe,
    updateEventID,
    newGame
    } = require('./controller/controller.js');

// ***Middleware***
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/public`));

// ***Misc End Points***
// Dev
app.post('/seed', seed);

// To restart game
app.delete('/all-travelers', deleteGEUTravelers);

// Restart
app.post('/new-game', newGame);

// Actions
app.get('/joes-action', joesAction);
app.get('/outcome', outcome);

// ***Travelers End Points***
// Traveler list and Fourth Responses
app.get('/travelers', getTravelers);

// Good Travelers
app.get('/good-travelers-list', getGoodTravelers);
app.post('/good-travelers', addGoodTravelers);

// Evil Travelers
app.get('/evil-travelers-list', getEvilTravelers);
app.post('/evil-travelers', addEvilTravelers);

// Unsure Travelers
app.get('/unsure-travelers-list', getUnsureTravelers);
app.post('/unsure-travelers', addUnsureTravelers);

// ***Joe End Points***
app.get('/joe', getJoe);
app.put('/joe', updateJoe);
app.put('/update', updateEventID);


// ***Server***
app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))