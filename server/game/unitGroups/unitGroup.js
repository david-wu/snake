var _ = require('lodash');



function UnitGroup(options){
    this.name = options.name;
    this.Constructor = options.Constructor;

    this.unitsById = {};
    this.units = [];
    this.board = options.board;
    this.diffs = options.diffs;
}

UnitGroup.prototype.add = function(unit){
    this.unitsById[unit.id] = unit;
    this.units.push(unit);
    this.board.addUnit(unit);
    this.diffs.push({
        action: 'addUnit',
        data: unit.state(),
    });

    return unit;
};

UnitGroup.prototype.remove = function(unit){
    delete this.unitsById[unit];
    _.pull(this.units, unit);
    this.board.removeUnit(unit);
    this.diffs.push({
        type: unit.type,
        action: 'removeUnit',
        data: unit.state(),
    });

    return unit;
};

UnitGroup.prototype.create = function(options){
    options.parent = this;
    options.board = this.board;
    options.diffs = this.diffs;
    var unit = new this.Constructor(options);

    return this.add(unit);
}

UnitGroup.prototype.tick = function(){
    for(var i=0, l=this.units.length; i<l; i++){

        // ticking triggers collisions that can remove units
        if(this.units[i]){
            this.units[i].tick();
        }
    }
};

module.exports = UnitGroup;

