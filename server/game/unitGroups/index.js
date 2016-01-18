var _ = require('lodash');
var UnitModels = require('./unitModels');
var UnitGroup = require('./unitGroup.js');
var Board = require('./board.js');

function UnitGroups(){
    this.board = new Board();
    this.diffs = [];

    this.groupsByName = {};

    this.initModelGroups();
}

UnitGroups.prototype.add = function(group){
    return this.groupsByName[group.name] = group;
};

UnitGroups.prototype.remove = function(group){
    delete this.groupsByName[group.name];
};

// Why board/diffs are added to options on create instead of the instance on add
// Add/Remove is for "indexing". storing contents byName, in an array, or on a board.
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

UnitGroups.prototype.initModelGroups = function(){
    var that = this;
    _.each(UnitModels, function(UnitModel){
        that.create(UnitModel.configs);
    });
};

UnitGroups.prototype.createInitDiffs = function(){
    var initDiffs = [];
    _.each(this.groupsByName, function(group){
        _.each(group.units, function(unit){
            initDiffs.push(unit.state());
        });
    });
    return initDiffs;
}

module.exports = UnitGroups;

