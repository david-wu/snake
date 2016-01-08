var _ = require('lodash');
var Food = require('./units/food');
var Powerup = require('./units/powerup.js');
var Board = require('./board');
function UnitManager(){

    this.users = [];
    this.foods = [];

    this.tickCount = 0;
    this.maxFoods = 5000;
    this.foodRange = [[-250, 250],[-250, 250]]
    this.spawnMaxFoodInterval = 10;


}

UnitManager.prototype.tick = function(){
    if(this.tickCount % this.spawnMaxFoodInterval === 0){
        this.spawnMaxFood();
    }

    _.each(this.users, function(user){
        user.tick();
    });


    this.checkCollisions();
    this.stateCache = this.state();



    this.tickCount++;

}


UnitManager.prototype.spawnMaxFood = function(){
    var missingFoodCount = this.maxFoods - this.foods.length;
    _.times(missingFoodCount, this.spawnFood.bind(this));
};

UnitManager.prototype.spawnFood = function(){
    if(this.foods.length >= this.maxFoods){return;}

    this.spawnPowerup();
    this.addFood(Food.createRandom({
        xRange: this.foodRange[0],
        yRange: this.foodRange[1],
    }));
};

UnitManager.prototype.spawnPowerup = function(){
    this.addFood(Powerup.createRandom({
        xRange: this.foodRange[0],
        yRange: this.foodRange[1],
    }))
};

UnitManager.prototype.checkCollisions = function(){
    var board = new Board();
    board.addFoods(this.foods);
    board.addUsers(this.users);
    board.checkCollisions();
};

UnitManager.prototype.state = function(){
    var state = {
        users: {},
        foods: {},
    };
    _.each(this.users, function(user){
        state.users[user.id] = user.state();;
    });
    _.each(this.foods, function(thing){
        state.foods[thing.id] = thing.state();
    });
    return state;
};

UnitManager.prototype.addFood = function(food){
    food.remove = this.removeFood.bind(this, food);
    this.foods.push(food);
}
UnitManager.prototype.removeFood = function(food){
    _.pull(this.foods, food);
};

UnitManager.prototype.removeUser = function(user){
        _.pull(this.users, user);
}

UnitManager.prototype.addUser = function(user){
    user.remove = this.removeUser.bind(this, user);
    this.users.push(user);
};



module.exports = UnitManager;