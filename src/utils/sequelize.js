const dotenv = require('dotenv');
const Sequelize = require('sequelize');

/**Loading config of environment */
dotenv.config()

const sequelize = new Sequelize(
    process.env.PG_DB,
    process.env.PG_USERNAME,
    process.env.PG_PASSWORD, {
    // gimme postgres, please!
    define: {
        timestamps: false
    },
    dialect: 'postgres',
    host: process.env.PG_HOST
})

module.exports = {
    sequelize,
    Sequelize
}