// ***Imports/Requires***
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const { SERVER_PORT } = process.env;
const { seed } = require('./controller/seed.js');
const { 
    nextAction,
    outcome,
    getGoodTravelers, 
    getEvilTravelers, 
    getUnsureTravelers, 
    addGoodTravelers, 
    addEvilTravelers, 
    addUnsureTravelers, 
    deleteUnsureTravelers,
    getJoe,
    updateJoe,
    newGame
    } = require('./controller/controller.js');

// ***Middleware***
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/public`));

// ***Endpoints***
// Dev
app.post('/seed', seed);

// Actions
app.get('/next-action', nextAction);
app.get('/outcome', outcome);

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

// Joe
app.get('/joe', getJoe);
app.put('/joe', updateJoe);

// Restart
app.post('/new-game', newGame);

// ***Server***
app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))