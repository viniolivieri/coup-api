const Players = require('../models/players')
const Op = require('../utils/sequelize').Sequelize.Op

const currentCoins = (session_id,player)=>{
    return Players.Player.findAll({
        where:{
            session_id: session_id,
            player_name: player
        }
    }).then(results=>{
        console.log(results)
        return results[0].dataValues.coins_quantity
    })
}

const addCoin = async (request, response)=>{
    var session_id = request.params.session_id
    var {player,coinsToAdd} = request.body
    var currCoins = await currentCoins(session_id, player)
    Players.Player.update({
        coins_quantity: currCoins + coinsToAdd
    },{
        where:{
            session_id: session_id,
            player_name: player
        }
    }).then(
        results=>{
            return response.json(results.dataValues)
        }
    )
}

module.exports={
    addCoin
}