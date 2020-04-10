const Seq = require('../utils/sequelize')

const Card = Seq.sequelize.define('card', {
    // attributes
    id: {
        type: Seq.Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Seq.Sequelize.STRING
    },
    description: {
        type: Seq.Sequelize.STRING
    },
    url_image: {
        type: Seq.Sequelize.STRING
    },
})

module.exports = {
    Card
}