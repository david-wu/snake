var _ = require('lodash');
var UnitModels = require('./unitModels');
var Board = require('./board');

function UnitManager(options){
    this.board = new Board();
    this.unitGroups = {};
    this.diffs = [];
}

UnitManager.prototype.tick = function(tickCount){
    var that = this;
    this.diffs = [];

    if(tickCount%10 === 0){
        this.spawnMaxFood();
    }

    _.each(this.unitGroups.snake, function(snake){
        snake.tick();
        that.diffs.push(snake.state());
        _.each(snake.segments, function(segment){
            that.diffs.push(segment.state());
        });
    });

    this.board.checkCollisions(this.unitGroups.snakes);
    this.stateCache = this.state();
};

UnitManager.prototype.addUnit = function(unit){
    unit.manager = this;

    this.unitGroups[unit.type] = this.unitGroups[unit.type] || {};
    this.unitGroups[unit.type][unit.id] = unit;
    this.board.addUnit(unit);
    this.diffs.push(unit);
    return unit;
};

UnitManager.prototype.removeUnit = function(unit){
    unit.removed = true;

    delete this.unitGroups[unit.type][unit.id];
    this.board.removeUnit(unit);
    this.diffs.push(unit);
    return unit;
};

UnitManager.prototype.createUnit = function(modelName, unitOptions, spawnRange){
    var UnitModel = UnitModels[modelName];
    var unit = new UnitModel(unitOptions);
    unit.pos = spawnRange ? randomPos(spawnRange) : unit.pos;
    return this.addUnit(unit);
};

UnitManager.prototype.spawnMaxFood = function(){
    var missingFoodCount = 5000 - _.size(this.unitGroups.food);
    var spawnArea = [[-250, 250],[-250, 250]];

    for(var i = 0; i < missingFoodCount; i++){
        this.createUnit('food', {}, spawnArea);
    }
};

UnitManager.prototype.state = function(){
    var state = {};
    _.each(this.unitGroups, function(unitGroup, groupName){
        state[groupName] = state[groupName] || {};
        _.each(unitGroup, function(unit){
            state[groupName][unit.id] = unit.state();
        });
    });
    return state;
};


function randomPos(range){
    var xRange = range[0] || [-50, 50];
    var yRange = range[1] || [-50, 50];
    return {
        x: Math.round(xRange[0] + Math.random()*(xRange[1]-xRange[0])),
        y: Math.round(yRange[0] + Math.random()*(yRange[1]-yRange[0])),
    };
}

module.exports = UnitManager;