const queries = require('../utils/queries')

const drawCard = async (request, response) => {
    var {card_number} = request.body
    var session_id = request.params.session_id
    var deck = await querySession({session_id: session_id})
    var cardsDrew = deck.splice(Math.floor(Math.random()*x.length), card_number);
    await queries.updateDeck(session_id,deck)
    return response.json(cardsDrew)
}

const backCard = async (request, response) => {
    var {cards} = request.body
    var session_id = request.params.session_id
    var deck = await querySession({session_id: session_id})
    deck.concat(cards)
    await queries.updateDeck(session_id,deck)
    return response.json(cards)
}

const updateHand = async (request, response) => {
    var {cards} = request.body
    var {session_id,
        player_name} = request.params
    await queries.updatePlayerCard(session_id, cards, player_name)
}

const killCard = async (request, response) => {
    var {card} = request.body
    var {session_id,
        player_name} = request.params
    var player_cards = await queryPlayers(
        {player_name: player_name,
        session_id: session_id}
    )
    if (player_cards[0].cards_sorted.length > 1) {
        if(player_cards[0].cards_sorted[0]==player_cards[0].cards_sorted[1]){
            var equal_cards = true
        }
        else {
            var equal_cards = false
        }
    }
    var cardKilled = [player_cards[0].cards_sorted.find(e=> e.id == card.id)]
    var cardLeft = [player_cards[0].cards_sorted.find(e=> e.id != card.id)]
    if (cardLeft == [] && equal_cards) {cardLeft=cardKilled} else {cardLeft=null}
    await queries.updatePlayerCard(session_id, cardLeft, player_name)
    await queries.updateCementery(session_id, card)
    return response.json(cardLeft)

}

module.exports = {
    drawCard,
    backCard,
    updateHand,
    killCard
}