var _ = require('lodash');
var Snake = require('./snake.js');

var userId = 0;
function User(options){
    this.id = userId++;
    this.socket = options.socket;
    this.name = 'player_' + this.id;
    this.socket.on('command', this.commandHandler.bind(this));
    this.createSnake();
    this.game = options.game;
}

User.prototype.remove = function(){
    if(this.game){
        this.game.removeUser(this);
    }
};

User.prototype.tick = function(){
    this.snake.tick();
};

User.prototype.sendState = function(state){
    var state = state || (this.game && this.game.stateCache);
    if(state){
        this.socket.emit('state', state);
    }
};

User.prototype.createSnake = function(){
    return this.snake = new Snake({
        user: this,
        initPos: {x: Math.round(Math.random()*20)-10, y: Math.round(Math.random()*20)-10},
        initVel: {x:0, y:0},
        grow: 0,
    });
};

User.prototype.commandHandler = function(command, callback){
    if(command.type === 'setVel'){
        _.extend(this.snake.segments[0].vel, command.vel);
    }else if(command.type === 'newSnake'){
        this.createSnake();
    }
};

User.prototype.state = function(){
    return {
        id: this.id,
        snake: this.snake.state(),
        name: this.name,
    };
};

module.exports = User;