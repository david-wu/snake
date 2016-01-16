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
    player.socket.emit('diffs', this.unitManager.stateDiffsCache);
    player.socket.emit('myCenterUnit', player.snake.segments[0].state());
    return player;
};

Game.prototype.removePlayer = function(player){
    var that = this;
    this.playerManager.removePlayer(player);
    _.each(player.snake.segments, function(segment){
        segment.snake = undefined;
        that.unitManager.board.addUnit(segment);
    });
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
