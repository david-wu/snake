var _ = require('lodash');
var Food = require('./units/food');
var Powerup = require('./units/powerup.js');
var Board = require('./board');

function UnitManager(options){
    this.users = [];
    this.snakes = [];
    this.immovables = [];

    this.game = options.game;


    this.board = new Board();

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
    var missingFoodCount = this.maxFoods - this.immovables.length;
    _.times(missingFoodCount, this.spawnFood.bind(this));
};

UnitManager.prototype.spawnFood = function(){
    if(this.immovables.length >= this.maxFoods){return;}

    this.spawnPowerup();
    this.addImmovable(Food.createRandom({
        xRange: this.foodRange[0],
        yRange: this.foodRange[1],
    }));
};

UnitManager.prototype.spawnPowerup = function(){
    this.addImmovable(Powerup.createRandom({
        xRange: this.foodRange[0],
        yRange: this.foodRange[1],
    }));
};

UnitManager.prototype.checkCollisions = function(){
    this.board.checkCollisions(this.users);
};

UnitManager.prototype.addImmovable = function(immovable){
    immovable.remove = this.removeImmovable.bind(this, immovable);
    this.board.addUnit(immovable);
    this.immovables.push(immovable);
};

UnitManager.prototype.removeImmovable = function(food){
    this.game.broadcast({
        tag: 'removeFood',
        payload: food.state(),
    });
    this.board.removeUnit(food);
    _.pull(this.immovables, food);
};

UnitManager.prototype.removeUser = function(user){
    _.pull(this.users, user);
};

UnitManager.prototype.addUser = function(user){
    user.remove = this.removeUser.bind(this, user);
    this.users.push(user);
};

UnitManager.prototype.state = function(){
    var state = {
        tick: this.tickCount,
        users: {},
        foods: {},
    };
    _.each(this.users, function(user){
        state.users[user.id] = user.state();;
    });
    _.each(this.immovables, function(thing){
        state.foods[thing.id] = thing.state();
    });
    return state;
};


module.exports = UnitManager;