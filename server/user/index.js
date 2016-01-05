var _ = require('lodash');
var Snake = require('./snake.js');

var userId = 0;
function User(options){
    this.socket = options.socket;
    this.game = options.game;
    this.id = userId++;
    this.name = 'player_' + this.id;
    this.snake = new Snake({
        initPos: {x:0, y:0},
        initVel: {x:0, y:0},
        grow: 3
    });

    this.socket.on('command', this.commandHandler.bind(this))
}

User.prototype.tick = function(){
    this.snake.tick();
};

User.prototype.sendState = function(state){
    this.socket.emit('state', state);
};

User.prototype.commandHandler = function(command){
    if(command.type === 'setVel'){
        _.extend(this.snake.segments[0].vel, command.vel);
    }else if(command.type === 'newSnake'){
        this.snake = new Snake({
            initPos: command.pos,
            initVel: command.vel,
            grow: command.grow,
        });
    }
};


module.exports = User;