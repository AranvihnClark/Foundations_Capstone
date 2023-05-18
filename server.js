// ***Imports/Requires***
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const { SERVER_PORT } = process.env;
const { seed } = require('./controller/seed.js');
const { 
    getGoodTravelers, 
    getEvilTravelers, 
    getUnsureTravelers, 
    addGoodTravelers, 
    addEvilTravelers, 
    addUnsureTravelers, 
    deleteUnsureTravelers,
    updateJoe,
    newGame
    } = require('./controller/controller.js');

// ***Middleware***
app.use(cors());
app.use(express.static(`${__dirname}/public`));

// ***Endpoints***
// Dev
app.post('/seed', seed);

// Actions
app.get('/', nextAction);

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
app.put('/joe', updateJoe);

// Restart
app.post('/new-game', newGame);

// ***Server***
app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`))