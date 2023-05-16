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

/*
                    ('name', age, 'occupation', good?, height, weight, 'difficulty',
                    'interrogate_traveler',
                    'interrogate_features',
                    'inspect_clothing',
                    'inspect_wares',
                    'inspect_special')

                    
*/

module.exports = {
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

    updateJoe: (req, res) => {

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