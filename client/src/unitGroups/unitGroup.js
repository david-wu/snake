var _ = require('lodash');



function UnitGroup(options){
    _.extend(this, options);
    this.units = [];
    this.unitsById = {};

    this.container = options.particle ? new PIXI.ParticleContainer() : new PIXI.Container();

    this.Constructor = options.Constructor;

    setInterval(function(){
        this.draw()
    }.bind(this), 16);

}

UnitGroup.prototype.add = function(unit){
    this.units.push(unit);
    this.container.addChild(unit.container);
    return this.unitsById[unit.id] = unit;
};

UnitGroup.prototype.remove = function(unit){
    delete this.unitsById[unit];
    _.pull(this.units, unit);
    this.container.removeChild(unit.container);
};

UnitGroup.prototype.create = function(options){
    options.parent = this;
    return this.add(new this.Constructor(options));
}

UnitGroup.prototype.draw = function(){
    for(var i=0, l=this.units.length; i<l; i++){
        this.units[i].draw();
    }
};

module.exports = UnitGroup;

