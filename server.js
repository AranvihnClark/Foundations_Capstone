// ***Imports/Requires***
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const { SERVER_PORT } = process.env;
const { seed } = require('./controller/seed.js');
const { 
    nextJoeAction,
    outcome,
    getTravelers,
    getGoodTravelers, 
    getEvilTravelers, 
    getUnsureTravelers, 
    addGoodTravelers, 
    addEvilTravelers, 
    addUnsureTravelers, 
    deleteUnsureTravelers,
    getJoe,
    updateJoe,
    increaseJoeEventID,
    newGame
    } = require('./controller/controller.js');

// ***Middleware***
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/public`));

// ***Misc End Points***
// Dev
app.post('/seed', seed);

// Restart
app.post('/new-game', newGame);

// Actions
app.get('/next-joe-action', nextJoeAction);
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
app.delete('/unsure-travelers/:id', deleteUnsureTravelers);

// ***Joe End Points***
app.get('/joe', getJoe);
app.put('/joe', updateJoe);

// Not a real end point.
app.get('/low-menatal-Health', increaseJoeEventID);


// ***Server***
app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))