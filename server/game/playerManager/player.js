var _ = require('lodash');
var playerId = 0;


function Player(options){
    this.id = playerId++;
    this.socket = options.socket;
    this.name = options.name || 'player_' + this.id;

    this.sendId();
    this.socket.on('command', this.commandHandler.bind(this));
}

Player.prototype.sendId = function(){
    this.socket.emit('myId', this.id);
};

Player.prototype.commandHandler = function(command){
    if(command.type === 'setVel'){
        if(!this.snake){return;}
        var head = _.last(this.snake.segments);
        if(!head){return;}
        if(this.snake.segments.length > 1){
            if(command.vel.x === -head.vel.x && command.vel.y === -head.vel.y){
                return;
            }
        }
        head.vel = command.vel;
    }
};

Player.prototype.invertControls = function(){
    this.controlsInverted = !this.controlsInverted;
}

module.exports = Player;