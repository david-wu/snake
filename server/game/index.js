var _ = require('lodash');
// var Food = require('./units/food');
// var Powerup = require('./units/powerup.js');
// var Board = require('./board');
var UnitManager = require('./unitManager.js');
function Game(){
    this.gameInterval = 50;
    // this.tickCount = 0;

    this.unitManager = new UnitManager();
    this.users = [];
    // this.foods = [];

    // this.maxFoods = 5000;
    // this.foodRange = [[-250, 250],[-250, 250]]
    // this.spawnMaxFoodInterval = 10;

}

Game.prototype.start = function(){
    setInterval(this.tick.bind(this), this.gameInterval);
    return this;
};

Game.prototype.tick = function(){
    var that = this;

    this.unitManager.tick();

    // if(this.tickCount % this.spawnMaxFoodInterval === 0){
    //     this.spawnMaxFood();
    // }
    // this.tickCount++

    // _.each(this.users, function(user){
    //     user.tick();
    // });
    // this.checkCollisions();
    // this.stateCache = this.state();

    _.each(this.users, function(user){
        if(user){
            that.updateUsers();
        }
    });
};

// Game.prototype.spawnMaxFood = function(){
//     var missingFoodCount = this.maxFoods - this.foods.length;
//     _.times(missingFoodCount, this.spawnFood.bind(this));
// };

// Game.prototype.spawnFood = function(){
//     if(this.foods.length >= this.maxFoods){return;}

//     this.spawnPowerup();
//     this.addFood(Food.createRandom({
//         xRange: this.foodRange[0],
//         yRange: this.foodRange[1],
//     }));
// };

// Game.prototype.spawnPowerup = function(){
//     this.addFood(Powerup.createRandom({
//         xRange: this.foodRange[0],
//         yRange: this.foodRange[1],
//     }))
// };

// Game.prototype.checkCollisions = function(){
//     var board = new Board();
//     board.addFoods(this.foods);
//     board.addUsers(this.users);
//     board.checkCollisions();
// };

// should populate and cache food and users seperately
// Game.prototype.state = function(){
//     var state = {
//         users: {},
//         foods: {},
//     };
//     _.each(this.users, function(user){
//         state.users[user.id] = user.state();;
//     });
//     _.each(this.foods, function(thing){
//         state.foods[thing.id] = thing.state();
//     });
//     return state;
// };

Game.prototype.updateUsers = function(){
    this.broadcast({
        tag: 'updateUsers',
        payload: this.unitManager.stateCache.users,
    });
};

Game.prototype.addUser = function(user){
    this.unitManager.addUser(user);
    user.remove = this.removeUser.bind(this, user);
    this.users.push(user);
    // should just send food state
    user.sendState(this.unitManager.stateCache);
};

Game.prototype.removeUser = function(user){
    _.pull(this.users, user);
    this.unitManager.removeUser(user);
};

Game.prototype.addFood = function(food){
    this.unitManager.addFood(food);
    // food.remove = this.removeFood.bind(this, food);
    // this.foods.push(food);
    this.broadcast({
        tag: 'addFood',
        payload: food.state(),
    });
};

Game.prototype.removeFood = function(food){
    // _.pull(this.foods, food);
    this.unitManager.removeFood(food);
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
