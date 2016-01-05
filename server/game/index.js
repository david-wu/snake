var _ = require('lodash');


function Game(){
    this.users = [];
}

Game.prototype.addUser = function(user){
    this.users.push(user);
};

Game.prototype.removeUser = function(user){
    _.pull(this.users, user);
};

Game.prototype.tick = function(){
    var that = this;
    var state = this.state();
    _.each(this.users, function(user){
        user.tick();
        user.sendState(state);
    });
};

Game.prototype.start = function(){
    this.tick();
    setInterval(this.tick.bind(this), 200);
    return this;
}

Game.prototype.state = function(){
    var state = {
        users: {},
        food: {},
    };
    _.each(this.users, function(user){
        state.users[user.id] = {
            name: user.name,
            id: user.id,
            snake: user.snake.segments,
        };
    });
    return state;
};

module.exports = Game;