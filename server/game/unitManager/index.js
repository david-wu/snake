var _ = require('lodash');
var UnitModels = require('./unitModels');
var Board = require('./board');

function UnitManager(options){
    this.unitGroups = {
        food: {},
        powerup: {},
        snake: {},
        segment: {}
    };
    this.diffs = [];
    this.board = new Board();

    this.tickCount = 0;
    this.maxFoods = 5000;
    this.foodRange = [[-250, 250],[-250, 250]]
    this.spawnMaxFoodInterval = 10;
}

UnitManager.prototype.tick = function(){
    var that = this;

    this.diffs = [];
    if(this.tickCount % this.spawnMaxFoodInterval === 0){
        this.spawnMaxFood();
    }
    _.each(this.unitGroups.snake, function(snake){
        snake.tick();
        _.each(snake.segments, function(segment){
            that.diffs.push(segment.state());
        });
        that.diffs.push(snake.state());
    });

    this.board.checkCollisions(this.unitGroups.snakes);
    this.stateCache = this.state();
    this.tickCount++;

};


UnitManager.prototype.createUnit = function(modelName, unitOptions, spawnRange){
    var UnitModel = UnitModels[modelName];
    var unit = new UnitModel(unitOptions);
    unit.pos = spawnRange ? randomPos(spawnRange) : unit.pos;
    return this.addUnit(unit);
};

UnitManager.prototype.addUnit = function(unit){
    unit.manager = this;
    this.unitGroups[unit.type][unit.id] = unit;
    unit.remove = this.removeUnit.bind(this, unit);

    if(unit.pos){
        this.board.addUnit(unit);
    }

    this.diffs.push(unit);

    return unit;
};

UnitManager.prototype.removeUnit = function(unit){
    if(unit.pos){
        this.board.removeUnit(unit);
    }

    unit.removed = true;
    this.diffs.push(unit);

    delete this.unitGroups[unit.type][unit.id];
};

UnitManager.prototype.spawnMaxFood = function(){
    var that = this;
    var missingFoodCount = this.maxFoods - Object.keys(this.unitGroups.food).length;
    _.times(missingFoodCount, function(){
        that.createUnit('food', {}, that.foodRange);
    });
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