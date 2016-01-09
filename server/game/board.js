var _ = require('lodash');



function Board(){
}

Board.prototype.addImmovable = function(food){
    var x = food.pos.x;
    var y = food.pos.y;
    this[x] = this[x] || {};
    this[x][y] = this[x][y] || [];
    this[x][y].push(food);
};

Board.prototype.addUnit = function(unit){
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
    _.pull(this[unit.pos.x][unit.pos.y], unit);
};


Board.prototype.addSnake = function(snake){
    var that = this;
    _.each(snake.segments, function(segment){
        that.addUnit(segment)
    });
};

Board.prototype.removeSnake = function(snake){
    var that = this;
    _.each(snake.segments, function(segment){
        that.removeUnit(segment);
    })
}


Board.prototype.addUsers = function(users){
    var that = this;
    _.each(users, function(user, userIndex){
        if(!user){return;}
        that.addSnake(user.snake);
    });
};

Board.prototype.clearUsers = function(users){
    var that = this;
    _.each(users, function(user, userIndex){
        if(!user){return;}
        that.removeSnake(user.snake);
    });
};

// Pulling logic out of addUsers would slow it down a little
Board.prototype.checkCollisions = function(users){
    this.addUsers(users);
    this.clearUsers(users);
};

module.exports = Board;