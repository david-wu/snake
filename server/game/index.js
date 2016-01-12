var _ = require('lodash');
var PlayerManager = require('./playerManager');
var UnitManager = require('./unitManager');

function Game(options){
    this.playerManager = new PlayerManager();
    this.unitManager = new UnitManager({
        game: this,
    });
    this.tickCount = 0;
    this.gameInterval = 50;
}

Game.prototype.createPlayer = function(options){
    var player = this.playerManager.createPlayer(options);
    player.snake = this.unitManager.createUnit('snake', {});
    player.socket.emit('state', this.unitManager.stateCache);
    return player;
};

Game.prototype.removePlayer = function(player){
    this.playerManager.removePlayer(player);
    this.unitManager.removeUnit(player.snake);
};

Game.prototype.tick = function(){
    this.unitManager.tick(this.tickCount++);
    this.playerManager.broadcast({
        tag: 'diffs',
        payload: this.unitManager.diffs,
    });
};

Game.prototype.start = function(){
    setInterval(this.tick.bind(this), this.gameInterval);
    return this;
};

module.exports = Game;
