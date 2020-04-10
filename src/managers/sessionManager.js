const iqid = require('uniqid');
const Sessions = require('../models/sessions')
const Players = require('../models/players')
const queries = require('../utils/queries')
const Op = require('../utils/sequelize').Sequelize.Op

const sessionPlayers = async (request,response) => {
    var id_finder = request.params.session_id
    var {players} = request.query
    return response.json(await queries.queryPlayers({session_id:id_finder}))
}

const newGame = async (request, response) => {
    /*var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;*/
    var creator = request.body.creator
    var id = iqid()
    var recentgame = await queries.checkRecentGame(creator)
    if (!recentgame) {
        var ts = new Date()
        Sessions.Session.create({
            creator: creator,
            created: ts.toISOString(),
            status: null,
            id_finder: id

        }).then(result => {
            console.log(`Game ${id} created successfully by ${creator}`)
            return response.json(result.dataValues)
        }).catch(err => {
            throw err
        })
    } else {
        console.log(`A recent game (id:${recentgame.id_finder}) was already created by ${creator}`)
        return response.json(recentgame)
    }
}

const enterGame = async (request, response) => {
    var player = request.body.player
    var id_finder = request.params.session_id
    var check_player = await queries.checkExistingPlayer(id_finder, player)
    if (!check_player) {
        var ts = new Date()
        Players.Player.create({
            created: ts.toISOString(),
            session_id: id_finder,
            player_name: player,
            player_id: (player + id_finder),
            cards_sorted: null,
            coins_quantity: 2
        }).then(
            results => {
                console.log(`Player ${player} inserted into the session: ${id_finder}`)
                return response.json(results.dataValues)
            }
        )
    } else {
        response.json({
            status: "error",
            message: `You are already at the session ${id_finder}.`
        })
    }
}

const startGame = async (request, response) => {
    var id_finder = request.params.session_id
    var players = await queries.queryPlayers({session_id:id_finder})
    var deck = await queries.queryCards()
    deck = deck.concat(deck).concat(deck)


    players.forEach( async e=> {
        card1 = deck.splice(Math.floor(Math.random()*deck.length), 1)
        card2 = deck.splice(Math.floor(Math.random()*deck.length), 1)
        e.cards_sorted = [card1[0], card2[0]]
        await Players.Player.update({
            cards_sorted: e.cards_sorted
        },{
            where:{
                session_id: e.session_id,
                player_name: e.player_name
            }
        }).then(
            results=>{
                console.log(`The player ${e.player_name} has drew ${card1[0].name} and ${card2[0].name}`)
            }
        )
    })
    await Sessions.Session.update({
        session_deck: deck,
        cementery: []
    },{
        where:{
            id_finder: id_finder
        }
    }).then(result=>{
        return response.json({
            status: 200,
            Message: "The game was started!"
        })
    }).catch(
        error=>{
            return response.send(error)
        }
    )
}

module.exports = {
    newGame,
    enterGame,
    startGame,
    sessionPlayers
}