const Seq = require('../utils/sequelize')

const Session = Seq.sequelize.define('session', {
    // attributes
    id_finder: {
        type: Seq.Sequelize.STRING,
        allowNull: false
    },
    creator: {
        type: Seq.Sequelize.INTEGER
    },
    status: {
        type: Seq.Sequelize.STRING
    },
    created: {
        type: Seq.Sequelize.TIME
    },
    session_deck: {
        type: Seq.Sequelize.ARRAY(Seq.Sequelize.JSON)
    },
    cementery: {
        type: Seq.Sequelize.ARRAY(Seq.Sequelize.JSON)
    }
})

module.exports = {
    Session
}