



function Units(){
    this.groups = [];
    this.groupsByName = {};
    this.container = PIXI && new PIXI.Container();

    this.units = [];
    this.unitsById = {};
}


Units.prototype.addGroup = function(group){
    this.groupsByName[group.name] = group;
    if(this.container){

    }
    this.container.addChild(group.container);
};

Units.prototype.removeGroup = function(group){
    delete this.groupsByName[group.name];
    this.container.removeChild(group.container);
};

Units.prototype.createGroup = function(options){
    options.parent = this;
    return new UnitGroup(options);
};


Units.prototype.addUnit = function(unit){
    this.unitsById[unit.id] = unit;
    this.groupsByName[unit.type].add(unit);
};

Units.prototype.removeUnit = function(unit){
    delete this.unitsById[unit.id];
    this.groupsByName[unit.type].remove(unit);
};

Units.prototype.createUnit = function(unit){
    var unit = this.groupsByName[options.type].create(options);
    return this.unitsById[unit.id] = unit;
};


Units.prototype.tick = function(){

};

Units.prototype.draw = function(){

};


UnitGroups.prototype.processDiff = function(diff){
    var unit = this.unitsById[diff.id];
    if(diff.action === 'create' || !unit){
        delete diff.action;
        var unit = this.createUnit(diff);
    }else if(diff.action === 'remove'){
        delete diff.action;
        this.removeUnit(unit);
    }else{
        _.extend(unit, diff);
    }
    return unit;
};


Units.prototype.initModelGroups = function(){
    var that = this;
    _.each(UnitModels, function(UnitModel){
        that.create(UnitModel.configs);
    });
};

module.exports = Units;

// var UnitModels = require('./unitModels');
// var UnitGroup = require('./unitGroup.js');

// UnitGroups.prototype.draw = function(){
//     _.each(this.groupsByName, function(group){
//         group.draw();
//     });
// };


// UnitGroups.prototype.addUnit = function(unit){
//     this.unitsById[unit.id] = unit;
//     this.groupsByName[unit.type].add(unit);
// };

// UnitGroups.prototype.removeUnit = function(unit){
//     delete this.unitsById[unit.id];
//     this.groupsByName[unit.type].remove(unit);
// };

// UnitGroups.prototype.createUnit = function(options){
//     var unit = this.groupsByName[options.type].create(options);
//     return this.unitsById[unit.id] = unit;
// };

// UnitGroups.prototype.processDiff = function(diff){
//     var unit = this.unitsById[diff.id];
//     if(diff.action === 'create' || !unit){
//         delete diff.action;
//         var unit = this.createUnit(diff);
//     }else if(diff.action === 'remove'){
//         delete diff.action;
//         this.removeUnit(unit);
//     }else{
//         _.extend(unit, diff);
//     }
//     return unit;
// };

// UnitGroups.prototype.initModelGroups = function(){
//     var that = this;
//     _.each(UnitModels, function(UnitModel){
//         that.create(UnitModel.configs);
//     });
// };

// module.exports = UnitGroups;

