const Seq = require('../utils/sequelize')

const Player = Seq.sequelize.define('player', {
    // attributes
    player_name: {
        type: Seq.Sequelize.STRING,
        allowNull: false
    },
    player_id: {
        type: Seq.Sequelize.STRING,
        allowNull: false
    },
    session_id: {
        type: Seq.Sequelize.STRING
        // allowNull defaults to true
    },
    coins_quantity: {
        type: Seq.Sequelize.INTEGER
    },
    cards_sorted: {
        type: Seq.Sequelize.ARRAY(Seq.Sequelize.JSON)
    },
    created: {
        type: Seq.Sequelize.TIME
    },
})

module.exports = {
    Player
}