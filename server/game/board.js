var _ = require('lodash');



function Board(){
}

Board.prototype.addFoods = function(foods){
    var that = this;
    _.each(foods, function(food, i){
        var x = food.pos.x;
        var y = food.pos.y;
        that[x] = that[x] || {};
        that[x][y] = that[x][y] || [];
        that[x][y].push(food);
    });
};

Board.prototype.addUsers = function(users){
    var that = this;
    _.each(users, function(user, userIndex){
        _.each(user.snake.segments, function(segment){
            var x = segment.pos.x;
            var y = segment.pos.y;
            that[x] = that[x] || {};
            if(that[x][y]){
                segment.collideWith(that[x][y]);
            }
            that[x][y] = that[x][y] || [];
            that[x][y].push(segment);
        });
    });
};

Board.prototype.checkCollisions = function(){

};

module.exports = Board;