require(`dotenv`).config();
const { CONNECTION_STRING } = process.env;

const Sequelize = require(`sequelize`);
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: `postgres`,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

let eventsID = 0;
/*
                    ('name', age, 'occupation', good?, height, weight, 'difficulty',
                    'interrogate_traveler',
                    'interrogate_features',
                    'inspect_clothing',
                    'inspect_wares',
                    'inspect_special')

                    
*/

module.exports = {
    nextAction: (req, res) => {
        eventsID++;
        sequelize.query(`
            SELECT *
            FROM events
            WHERE event_id = ${eventsID};
            `
        )
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));        
    },

    outcome: (req, res) => {
        sequelize.query(`
            SELECT *
            FROM event_responses
            WHERE event_id = ${eventsID}
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },

    getGoodTravelers: (req, res) => {

    },

    getEvilTravelers: (req, res) => {

    },

    getUnsureTravelers: (req, res) => {

    },

    addGoodTravelers: (req, res) => {

    },

    addEvilTravelers: (req, res) => {

    },

    addUnsureTravelers: (req, res) => {

    },

    deleteUnsureTravelers: (req, res) => {

    },

    getJoe: (req, res) => {
        sequelize.query(`
            SELECT mental_health
            FROM joe
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },

    updateJoe: (req, res) => {
        const { mental_health } = req.body;
        sequelize.query(`
            UPDATE joe
            SET mental_health = '${mental_health}'
            WHERE joe_id = 1;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },

    newGame: (req, res) => {

    }
    /* In case if I can get to this in time.
    getLeaderboard: (req, res) => {

    },
    
    addToLeaderboard: (req, res) => {

    }
    */
}