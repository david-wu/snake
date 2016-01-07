var _ = require('lodash');
var Snake = require('./snake.js');

var userId = 0;
function User(options){
    this.id = userId++;
    this.socket = options.socket;
    this.name = options.name || 'player_' + this.id;

    this.createSnake();
    this.sendId();
    this.socket.on('command', this.commandHandler.bind(this));
}

User.prototype.createSnake = function(){
    return this.snake = new Snake({
        user: this,
        initPos: {x: Math.round(Math.random()*20)-10, y: Math.round(Math.random()*20)-10},
        initVel: {x:0, y:0},
    });
};

User.prototype.sendId = function(){
    this.socket.emit('myId', this.id);
};

User.prototype.commandHandler = function(command, callback){
    if(command.type === 'setVel'){
        this.snake.segments[0].vel = command.vel;
    }else if(command.type === 'newSnake'){
        this.createSnake();
    }
};

User.prototype.tick = function(){
    this.snake.tick();
};

User.prototype.sendState = function(state){
    if(!state){return;}
    this.socket.emit('state', state);
};

User.prototype.state = function(){
    return {
        id: this.id,
        snake: this.snake.state(),
        name: this.name,
    };
};

module.exports = User;