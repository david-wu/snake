var _ = require('lodash');

var userId = 0;
function User(options){
    this.socket = options.socket;
    this.game = options.game;
    this.id = userId++;
    this.name = 'player_' + this.id;
    this.snake = new Snake();

    this.socket.on('command', this.commandHandler.bind(this))
}

User.prototype.sendState = function(state){
    this.socket.emit('state', state);
};

User.prototype.tick = function(){
    this.snake.tick();
};

User.prototype.commandHandler = function(command){
    if(command.type === 'setVel'){
        _.extend(this.snake.segments[0].vel, command.vel);
    }
};


function Snake(options){
    options = options || {};
    this.segments = [{
        pos: options.initPos || {x: 0, y: 0},
        vel: options.initVel || {x: 0, y: 1},
    }];
}

Snake.prototype.tick = function(){
    var head = this.segments[0];
    head.pos.x += head.vel.x;
    head.pos.y += head.vel.y;
    for(var i = 1; i < this.segments.length; i++){
        this.segments[i].pos.x = this.segments[i-1].pos.x
        this.segments[i].pos.y = this.segments[i-1].pos.y
    }
}


module.exports = User;