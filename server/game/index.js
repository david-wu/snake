var _ = require('lodash');
var Food = require('./food');
var Board = require('./board');

function Game(){
    this.users = [];
    this.foods = [];
    this.maxFoods = 20;
}

Game.prototype.addUser = function(user){
    user.users = this.users;
    this.users.push(user);
};

Game.prototype.removeUser = function(user){
    _.pull(this.users, user);
};

Game.prototype.start = function(){
    setInterval(this.tick.bind(this), 50);
    setInterval(this.spawnFood.bind(this), 2000);
    return this;
};

Game.prototype.tick = function(){
    var that = this;

    _.each(this.users, function(user){
        user.tick();
    });

    this.checkCollisions();

    var state = this.state();
    _.each(this.users, function(user){
        user.sendState(state);
    });
};

Game.prototype.spawnFood = function(){
    if(this.foods.length >= this.maxFoods){return}
    this.foods.push(Food.createRandom({
        xRange: [-20, 20],
        yRange: [-20, 20],
        foods: this.foods,
    }));
};

Game.prototype.checkCollisions = function(){
    var board = new Board();
    board.addFoods(this.foods);
    board.addUsers(this.users);
    board.checkCollisions();
};

Game.prototype.state = function(){
    var state = {
        users: {},
        foods: {},
    };
    _.each(this.users, function(user){
        state.users[user.id] = user.state();;
    });
    _.each(this.foods, function(food){
        state.foods[food.id] = food.state();
    });
    return state;
};

module.exports = Game;
