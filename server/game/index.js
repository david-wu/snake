var _ = require('lodash');
var UnitManager = require('./unitManager.js');


function Game(){
    this.gameInterval = 50;
    this.unitManager = new UnitManager();
    this.users = [];
}

Game.prototype.tick = function(){
    var that = this;
    this.unitManager.tick();
    _.each(this.users, function(user){
        if(user){
            that.updateUsers();
        }
    });
};

Game.prototype.start = function(){
    setInterval(this.tick.bind(this), this.gameInterval);
    return this;
};

Game.prototype.broadcast = function(message){
    _.each(this.users, function(user){
        user.socket.emit(message.tag, message.payload);
    });
};

Game.prototype.updateUsers = function(){
    this.broadcast({
        tag: 'updateUsers',
        payload: this.unitManager.stateCache.users,
    });
};

// Need to split up user and snake
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
    this.broadcast({
        tag: 'addFood',
        payload: food.state(),
    });
};

Game.prototype.removeFood = function(food){
    this.unitManager.removeFood(food);
    this.broadcast({
        tag: 'removeFood',
        payload: food.state(),
    });
};

module.exports = Game;
