var _ = require('lodash');
var UnitModels = require('./unitModels');
var UnitGroup = require('./unitGroup.js');
var Board = require('./board.js');

function UnitGroups(){
    this.groupsByName = {};
    this.board = new Board();
    this.diffs = [];

    this.initModelGroups();
}

UnitGroups.prototype.add = function(group){
    return this.groupsByName[group.name] = group;
};

UnitGroups.prototype.remove = function(group){
    delete this.groupsByName[group.name];
};

UnitGroups.prototype.create = function(options){
    options.board = this.board;
    options.diffs = this.diffs;
    return this.add(new UnitGroup(options));
};

UnitGroups.prototype.createUnit = function(tag, options){
    return this.groupsByName[tag].create(options);
};

UnitGroups.prototype.tick = function(){
    this.diffs.length = 0;
    _.each(this.groupsByName, function(group){
        group.tick();
    });
};

UnitGroups.prototype.initialDiffs = function(){
    var initialDiffs = [];
    _.each(this.groupsByName, function(group){
        _.each(group.units, function(unit){
            initialDiffs.push(unit.state());
        });
    });
    return initialDiffs;
};

UnitGroups.prototype.createSnake = function(){
    var snake = this.createUnit('snake', {});
    var snakeHead = this.createUnit('segment', {
        flavor: _.random(4),
    });
    snakeHead.randomizePosition();
    snake.addSegment(snakeHead);

    return snake;
};

UnitGroups.prototype.initModelGroups = function(){
    var that = this;
    _.each(UnitModels, function(UnitModel){
        that.create(UnitModel.configs);
    });
};

module.exports = UnitGroups;

