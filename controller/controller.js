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

let eventID = 0;

/*
                    ('name', age, 'occupation', good?, height, weight, 'difficulty',
                    'interrogate_traveler',
                    'interrogate_features',
                    'inspect_clothing',
                    'inspect_wares',
                    'inspect_special')

                    
*/

module.exports = {
    joesAction: (req, res) => {
        sequelize.query(`
            SELECT *
            FROM joe_events;
            `
        )
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));        
    },

    outcome: (req, res) => {
        sequelize.query(`
            SELECT *
            FROM joe_event_responses
            WHERE joe_event_id = ${eventID};
        `)
        .then(dbRes => {
            return res.status(200).send(dbRes[0]);
        })
        .catch(err => console.log(err));
    },

    updateEventID: (req, res) => {
        const { id }  = req.body;
        eventID = id;
    },

    getTravelers: (req, res) => {
        sequelize.query(`
            SELECT *
            FROM travelers
            WHERE difficulty = 'Easy';
        
            SELECT *
            FROM travelers
            WHERE difficulty = 'Medium';

            SELECT *
            FROM travelers
            WHERE difficulty = 'Hard';
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },

    getGoodTravelers: (req, res) => {
        sequelize.query(`
            SELECT name
            FROM travelers as t
            JOIN good_travelers as n
            ON t.traveler_id = n.traveler_id;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },

    getEvilTravelers: (req, res) => {
        sequelize.query(`
            SELECT name
            FROM travelers as t
            JOIN evil_travelers as e
            ON t.traveler_id = e.traveler_id;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },

    getUnsureTravelers: (req, res) => {
        sequelize.query(`
            SELECT name
            FROM travelers as t
            JOIN unsure_travelers as u
            ON t.traveler_id = u.traveler_id;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));

    },

    addGoodTravelers: (req, res) => {
        const { id } = req.body;

        sequelize.query(`
            INSERT INTO good_travelers(traveler_id)
            VALUES (${id});
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },

    addEvilTravelers: (req, res) => {
        const { id } = req.body;

        sequelize.query(`
            INSERT INTO evil_travelers(traveler_id)
            VALUES (${id});
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },

    addUnsureTravelers: (req, res) => {
        const { id } = req.body;

        sequelize.query(`
            INSERT INTO unsure_travelers(traveler_id)
            VALUES (${id});
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },

    deleteGEUTravelers: (req, res) => {
        eventID = 0;
        sequelize.query(`
            DROP TABLE IF EXISTS good_travelers CASCADE;
            DROP TABLE IF EXISTS evil_travelers CASCADE;
            DROP TABLE IF EXISTS unsure_travelers CASCADE;
        `)
        .then(dbRes => res.sendStatus(200))
        .catch(err => console.log(err));
    },

    restoreLists: (req, res) => {
        sequelize.query(`
            CREATE TABLE good_travelers(
                good_traveler_id SERIAL PRIMARY KEY,
                traveler_id INT REFERENCES travelers(traveler_id)
            );
        
            CREATE TABLE evil_travelers(
                evil_traveler_id SERIAL PRIMARY KEY,
                traveler_id INT REFERENCES travelers(traveler_id)
            );
        
            CREATE TABLE unsure_travelers(
                unsure_traveler_id SERIAL PRIMARY KEY,
                traveler_id INT REFERENCES travelers(traveler_id)
            );
        `)
        .then(dbRes => res.sendStatus(200))
        .catch(err => console.log(err));
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