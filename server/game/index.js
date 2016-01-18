var _ = require('lodash');
var PlayerManager = require('./playerManager');
var UnitGroups = require('./unitGroups');

function Game(options){
    this.playerManager = new PlayerManager();
    this.unitGroups = new UnitGroups();

    this.tickCount = 0;
    this.gameInterval = 100;

    this.spawnSegments();
}

Game.prototype.createPlayer = function(options){
    var player = this.playerManager.createPlayer(options);
    player.snake = this.createRandomSnake();

    player.socket.emit('diffs', this.unitGroups.createInitDiffs());
    player.socket.emit('myCenterUnit', player.snake.segments[0].state());

    return player;
};

Game.prototype.createRandomSnake = function(){
    var snake = this.unitGroups.createUnit('snake', {});
    var snakeHead = this.unitGroups.createUnit('segment', {flavor: _.random(4)});
    snakeHead.randomizePosition();
    snake.segments.push(snakeHead);
    return snake;
};

Game.prototype.removePlayer = function(player){
    var that = this;

    this.playerManager.removePlayer(player);

    _.each(player.snake.segments, function(segment){
        delete segment.snake;
    });

    player.snake.remove();
};

Game.prototype.tick = function(){
    this.unitGroups.tick();
    this.playerManager.broadcast({
        tag: 'diffs',
        payload: this.unitGroups.diffs,
    });
};

Game.prototype.start = function(){
    setInterval(this.tick.bind(this), this.gameInterval);
    return this;
};

Game.prototype.spawnSegments = function(){
    var segmentGroup = this.unitGroups.groupsByName.segment;

    var missingSegmentCount = 5000 - _.size(segmentGroup.units);
    var spawnArea = [[-250, 250],[-250, 250]];

    for(var i = 0; i < missingSegmentCount; i++){
        segmentGroup.create({
            flavor: i%5,
        }).randomizePosition(spawnArea);
    }
};

module.exports = Game;
