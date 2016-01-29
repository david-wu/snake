var _ = require('lodash');
var Models = require('./models');
var UnitGroup = require('./unitGroup.js');
var Board = require('./board.js');

function Units(){
    this.groups = [];
    this.groupsByName = {};
    this.container = PIXI && new PIXI.Container();

    this.units = [];
    this.unitsById = {};
}


Units.prototype.addGroup = function(group){
    this.groups.push(group);
    this.groupsByName[group.name] = group;
    if(this.container){
        this.container.addChild(group.container);
    }
};

Units.prototype.removeGroup = function(group){
    _.pull(this.groups, group);
    delete this.groupsByName[group.name];
    if(this.container){
        this.container.removeChild(group.container);
    }
};

Units.prototype.createGroup = function(options){
    options.parent = this;
    return new UnitGroup(options);
};


Units.prototype.addUnit = function(unit){
    this.units.push(unit);
    this.unitsById[unit.id] = unit;
    this.groupsByName[unit.type].add(unit);
};

Units.prototype.removeUnit = function(unit){
    _.pull(this.units, unit);
    delete this.unitsById[unit.id];
    this.groupsByName[unit.type].remove(unit);
};

Units.prototype.createUnit = function(type, options){
    var UnitModel = Models[type];
    var unit = new UnitModel(options);
    return unit;
};

// returns diffs
Units.prototype.tick = function(){
    var diffs = [];
    _.each(this.units, function(unit){
        diffs.push.apply(diffs, unit.tick());
    });
    return diffs;
};

Units.prototype.processDiff = function(diff){
    actions[diff.action](diff.payload);
};
var actions = {
    create: function(){

    },
    remove: function(){

    },
};


Units.prototype.draw = function(){
    _.each(this.units, function(unit){
        unit.draw();
    });
};


Units.prototype.initModelGroups = function(){
    var that = this;
    _.each(UnitModels, function(UnitModel){
        that.createGroup(UnitModel.configs);
    });
};



module.exports = Units;

