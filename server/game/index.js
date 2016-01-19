var _ = require('lodash');
var PlayerManager = require('./playerManager');
var UnitGroups = require('./unitGroups');

function Game(){
    this.playerManager = new PlayerManager();
    this.unitGroups = new UnitGroups();

    this.spawnSegments();
}

Game.prototype.createPlayer = function(options){
    var player = this.playerManager.createPlayer(options);
    player.snake = this.unitGroups.createSnake();

    player.socket.emit('diffs', this.unitGroups.initialDiffs());
    player.socket.emit('myCenterUnit', player.snake.segments[0].state());

    return player;
};

Game.prototype.removePlayer = function(player){
    this.playerManager.removePlayer(player);
    player.snake.remove();
};

Game.prototype.tick = function(){
    this.unitGroups.tick();
    this.playerManager.broadcast({
        tag: 'diffs',
        payload: this.unitGroups.diffs,
    });
};

Game.prototype.start = function(dT){
    setInterval(this.tick.bind(this), dT || 100);
    return this;
};

Game.prototype.spawnSegments = function(){
    var segmentGroup = this.unitGroups.groupsByName.segment;
    var missingSegmentCount = 5000 - _.size(segmentGroup.units);
    var spawnArea = [[-250, 250],[-250, 250]];

    for(var i=0; i<missingSegmentCount; i++){
        segmentGroup.create({
            flavor: i%5,
        }).randomizePosition(spawnArea);
    }
};

module.exports = Game;
