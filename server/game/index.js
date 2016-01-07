var _ = require('lodash');
var Food = require('./food');
var Board = require('./board');

function Game(){
    this.users = [];
    this.foods = [];
    this.gameInterval = 50;

    this.maxFoods = 10000;
    this.foodRange = [[-400, 400],[-400, 400]]
    this.spawnMaxFoodInterval = 10;

    this.tickCount = 0;
}

Game.prototype.start = function(){
    setInterval(this.tick.bind(this), this.gameInterval);
    return this;
};

Game.prototype.tick = function(){
    var that = this;

    if(this.tickCount % this.spawnMaxFoodInterval === 0){
        this.spawnMaxFood();
    }
    this.tickCount++

    _.each(this.users, function(user){
        user.tick();
    });
    this.checkCollisions();
    this.stateCache = this.state();

    _.each(this.users, function(user){
        if(user){
            that.updateUsers()
        }
    });
};

Game.prototype.spawnMaxFood = function(){
    var missingFoodCount = this.maxFoods - this.foods.length;
    _.times(missingFoodCount, this.spawnFood.bind(this));
};

Game.prototype.spawnFood = function(){
    if(this.foods.length >= this.maxFoods){return;}
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

Game.prototype.updateUsers = function(){
    this.broadcast({
        tag: 'updateUsers',
        payload: this.stateCache.users,
    });
};

Game.prototype.addUser = function(user){
    user.remove = this.removeUser.bind(this, user);
    this.users.push(user);
    user.sendState(this.stateCache);
};

Game.prototype.removeUser = function(user){
    _.pull(this.users, user);
};

Game.prototype.addFood = function(food){
    food.remove = this.removeFood.bind(this, food);
    this.foods.push(food);
    this.broadcast({
        tag: 'addFood',
        payload: food.state(),
    });
};

Game.prototype.removeFood = function(food){
    _.pull(this.foods, food);
    this.broadcast({
        tag: 'removeFood',
        payload: food.state(),
    });
};

Game.prototype.broadcast = function(message){
    _.each(this.users, function(user){
        user.socket.emit(message.tag, message.payload)
    });
};

module.exports = Game;
