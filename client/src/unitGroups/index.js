var UnitModels = require('./unitModels');
var UnitGroup = require('./services/unitGroup.js');


function UnitGroups(){
    this.groupsByName = {};
    this.container = new PIXI.Container();
    this.initModelGroups();
}

UnitGroups.prototype.add = function(group){
    this.groupsByName[group.name] = group;
    this.container.addChild(group.container);
};

UnitGroups.prototype.remove = function(group){
    delete this.groupsByName[group.name];
    this.container.removeChild(group.container);
};

UnitGroups.prototype.create = function(options){
    options.parent = this;
    this.add(new UnitGroup(options));
};

UnitGroups.prototype.draw = function(){
    _.each(this.groupsByName, function(group){
        group.draw();
    });
};

UnitGroups.prototype.processDiff = function(diff){
    if(!this.groupsByName[diff.type]){debugger;}
    this.groupsByName[diff.type].processDiff(diff);
};

UnitGroups.prototype.initModelGroups = function(){
    var that = this;
    _.each(UnitModels, function(UnitModel){
        that.create(UnitModel.configs);
    });
};

module.exports = UnitGroups;

