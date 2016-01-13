var _ = require('lodash');
var Player = require('./player.js')


function PlayerManager(){
    this.players = {};
}

PlayerManager.prototype.createPlayer = function(playerOptions){
    var player = new Player(playerOptions);
    this.players[player.id] = player;
    return player;
};

PlayerManager.prototype.removePlayer = function(player){
    delete this.players[player.id];
};

PlayerManager.prototype.broadcast = function(message){
    _.each(this.players, function(player){
        player.socket.emit(message.tag, message.payload);
    });
};

module.exports = PlayerManager;