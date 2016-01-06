var _ = require('lodash');
var Snake = require('./snake.js');

var userId = 0;
function User(options){
    this.id = userId++;
    this.socket = options.socket;
    this.name = 'player_' + this.id;
    this.snake = new Snake({
        user: this,
        initPos: {x:0, y:0},
        initVel: {x:0, y:0},
        grow: 0,
    });
    this.game = options.game
    this.socket.on('command', this.commandHandler.bind(this));
}

User.prototype.remove = function(){
    this.game.removeUser(this);
};

User.prototype.tick = function(){
    this.snake.tick();
};

User.prototype.sendState = function(state){
    this.socket.emit('state', state);
};

User.prototype.commandHandler = function(command, callback){
    if(command.type === 'setVel'){
        _.extend(this.snake.segments[0].vel, command.vel);
    }
    // else if(command.type === 'newSnake'){
    //     this.snake = new Snake({
    //         initPos: command.pos,
    //         initVel: command.vel,
    //         grow: command.grow,
    //     });
    //     callback(this.snake)
    // }
    else if(command.type === 'setName'){
        this.name = command.value;
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