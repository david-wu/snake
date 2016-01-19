var _ = require('lodash');



function UnitGroup(options){
    // _.extend(this, options);
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
        action: 'removeUnit',
        data: unit.state(),
    });

    return unit;
};

UnitGroup.prototype.create = function(options){
    options.board = this.board;
    options.diffs = this.diffs;
    var unit = new this.Constructor(options);

    unit.remove = this.remove.bind(this, unit);
    this.add(unit);

    return unit;
}

UnitGroup.prototype.tick = function(){
    for(var i=0, l=this.units.length; i<l; i++){

        // ticking triggers collisions that can remove units
        if(this.units[i]){
            this.units[i].tick();
        }
    }
};

// UnitGroup.prototype.processDiffs = function(diffs){
//     _.each(diffs, function(diff){

//     });
// };

module.exports = UnitGroup;

