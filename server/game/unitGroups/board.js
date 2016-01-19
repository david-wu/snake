var _ = require('lodash');


// Use matrix eventually
function Board(){}

Board.prototype.addUnit = function(unit){
    if(!unit || !unit.pos){return;}
    var x = unit.pos.x;
    var y = unit.pos.y;
    this[x] = this[x] || {};
    this[x][y] = this[x][y] || [];

    unit.collideWith(this[x][y]);
    this[x][y].push(unit);
};

Board.prototype.removeUnit = function(unit){
    if(!unit || !unit.pos){return;}
    _.pull(this[unit.pos.x][unit.pos.y], unit);
};

module.exports = Board;