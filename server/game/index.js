var _ = require('lodash');
var Food = require('./food');
var Board = require('./board');

function Game(){
    this.users = [];
    this.foods = [];
    this.gameInterval = 50;

    this.maxFoods = 2500;
    this.foodRange = [[-200, 200],[-200, 200]]
    this.spawnMaxFoodFrequency = 10;

    this.tickCount = 0;
}

Game.prototype.start = function(){
    this.gameInterval = setInterval(this.tick.bind(this), this.gameInterval);
    setInterval(this.spawnMaxFood.bind(this), this.spawnMaxFoodInterval);
    return this;
};

Game.prototype.tick = function(){
    var that = this;

    if(this.tickCount % this.spawnMaxFoodFrequency === 0){
        this.spawnMaxFood();
    }
    this.tickCount++

    _.each(this.users, function(user){
        user.tick();
    });
    this.checkCollisions();
    this.stateCache = this.state();

    _.each(this.users, function(user){
        user.sendState(that.stateCache);
    });
};

Game.prototype.spawnMaxFood = function(){
    var missingFoodCount = this.maxFoods - this.foods.length;
    _.times(missingFoodCount, this.spawnFood.bind(this));
};

Game.prototype.spawnFood = function(){
    if(this.foods.length >= this.maxFoods){return}
    this.addFood(Food.createRandom({
        xRange: this.foodRange[0],
        yRange: this.foodRange[1],
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

Game.prototype.addUser = function(user){
    user.game = this;
    this.users.push(user);
};
Game.prototype.removeUser = function(user){
    _.pull(this.users, user);
};

Game.prototype.addFood = function(food){
    food.foods = this.foods;
    this.foods.push(food);
}
Game.prototype.removeFood = function(food){
    _.pull(this.foods, food);
};

module.exports = Game;
