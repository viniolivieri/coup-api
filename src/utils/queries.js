const Sessions = require('../models/sessions')
const Players = require('../models/players')
const Cards = require('../models/cards')

const queryPlayers = (filters=null) => {
    return Players.Player.findAll({
        where:filters
    }).then(
        result=>{
            return JSON.parse(JSON.stringify(result,null,4))
        }
    )
}

const queryCards = (filters=null) => {
    return Cards.Card.findAll({where:filters}).then(
        result=>{
            return JSON.parse(JSON.stringify(result,null,4))
        }
    )
}

const querySession = (filters=null) => {
    return Session.Session.findAll({
        where:filters
    }).then(
        result=>{
            return JSON.parse(JSON.stringify(result,null,4))
        }
    )
}

const checkRecentGame = async (creator) => {
    var ts = new Date()
    return Sessions.Session.findAll({
        where: {
            creator: creator,
            created: {
                [Op.between]: [(new Date(ts - 5 * 60000)).toISOString(), ts.toISOString()]
            }
        }
    }).then(
        (recent_games => {
            if (Object.keys(recent_games).length !== 0 && recent_games.constructor !== Object) {
                return recent_games[0].dataValues
            } else {
                return false
            }
        })
    )
}

const checkExistingPlayer = (id_finder, player) => {
    var ts = new Date()
    return Players.Player.findAll({
        where: {
            player_name: player,
            session_id: id_finder,
            created: {
                [Op.between]: [(new Date(ts - 5 * 60000)).toISOString(), ts.toISOString()]
            }
        }
    }).then((player => {
        if (Object.keys(player).length !== 0 && player.constructor !== Object) {
            return player[0].dataValues
        } else {
            return false
        }
    }))
}

const updateDeck = (session_id, deck) => {
    Sessions.Session.update({
        session_deck: deck
    },{
        where: {
            id_finder: session_id
        }
    })
}

const updateCementery = async (session_id, card) => {
    current_cementery = await querySession({id_finder: session_id})

    Sessions.Session.update({
        cementery: current_cementery[0].cementery.concat(card)
    },{
        where: {
            id_finder: session_id
        }
    })
}

const updatePlayerCard = (session_id, cards, player_name) => {
    Players.Player.update({
        cards_sorted: cards
    },{
        where: {
            session_id: session_id,
            player_name: player_name
        }
    })
}

module.exports = {
    queryPlayers,
    queryCards,
    querySession,
    checkRecentGame,
    checkExistingPlayer,
    updateDeck,
    updatePlayerCard,
    updateCementery
}