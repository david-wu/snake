var _ = require('lodash');



function Board(){}

Board.prototype.addUnit = function(unit){
    if(!unit || !unit.pos){return;}
    var x = unit.pos.x;
    var y = unit.pos.y;
    this[x] = this[x] || {};
    if(unit.collideWith && this[x][y]){
        unit.collideWith(this[x][y]);
    }
    this[x][y] = this[x][y] || [];
    this[x][y].push(unit);
}

Board.prototype.removeUnit = function(unit){
    if(!unit || !unit.pos){return;}
    _.pull(this[unit.pos.x][unit.pos.y], unit);
};

Board.prototype.checkCollisions = function(unit){
    var x = unit.pos.x;
    var y = unit.pos.y;
    unit.collidWith(this[x][y]);
}

// Board.prototype.addSnakes = function(snakes){
//     var that = this;
//     _.each(snakes, function(snake){
//         _.each(snake.segments, function(segment){
//             that.addUnit(segment);
//         });
//     });
// };

// Board.prototype.clearSnakes = function(snakes){
//     var that = this;
//     _.each(snakes, function(snake){
//         _.each(snake.segments, function(segment){
//             that.removeUnit(segment);
//         });
//     });
// };

// Board.prototype.checkCollisions = function(snakes){
//     this.addSnakes(snakes);
//     this.clearSnakes(snakes);
// };

module.exports = Board;