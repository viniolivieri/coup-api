const express = require('express');
const sessionManager = require('./managers/sessionManager');
const coinManager = require('./managers/coinManager');
const deckManager = require('./managers/deckManager');

const app = express();
app.use(express.json());

//Session Manager
///Post
app.post('/new_game', sessionManager.newGame)
app.post('/:session_id/enter_game', sessionManager.enterGame)
app.post('/:session_id/start_game', sessionManager.startGame)
///Get
app.get('/:session_id/players', sessionManager.sessionPlayers)

//Coin Manager
///Put
app.put('/:session_id/add_coin', coinManager.addCoin)

//Deck Manager
///Post
app.post('/:session_id/draw_card', deckManager.drawCard)
app.post('/:session_id/back_card', deckManager.backCard)
app.put('/:session_id/:player_id/update_hand', deckManager.updateHand)
app.put('/:session_id/:player_id/kill_card', deckManager.killCard)

app.listen(3000);