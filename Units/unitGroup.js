var _ = require('lodash');



function UnitGroup(options){
    this.units = [];
    this.unitsById = {};

    if(PIXI){
        this.container = options.particle ? new PIXI.ParticleContainer() : new PIXI.Container();
    }
}


UnitGroup.prototype.add = function(unit){
    this.units.push(unit);
    this.container.addChild(unit.container);
    return this.unitsById[unit.id] = unit;
};

UnitGroup.prototype.remove = function(unit){
    _.pull(this.units, unit);
    this.container.removeChild(unit.container);
    delete this.unitsById[unit];
};

UnitGroup.prototype.draw = function(){
    for(var i=0, l=this.units.length; i<l; i++){
        this.units[i].draw();
    }
};

module.exports = UnitGroup;

