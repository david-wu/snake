_ = require('lodash');
var io = require('socket.io-client');
var User = require('./user');
var Stage = require('./stage');

var socket = io.connect(location.origin);

var users = {};
socket.on('state', function(res){
    _.each(res.users, function(user, userId){
        if(!users[userId]){
            users[userId] = new User({
                id: userId,
                snake: user.snake,
                name: user.name,
            });
            stage.container.addChild(users[userId].container)
        }
        users[userId].snake = user.snake;
    });
});


var viewBounds = [-750, -750, 750, 750];
var scroll = {};
var zoom = {};
document.onkeydown = function(e){
    var vel = {x:0,y:0};
    if(e.keyCode === 87){
        vel.y = -1;
    }else if(e.keyCode === 65){
        vel.x = -1;
    }else if(e.keyCode === 83){
        vel.y = 1;
    }else if(e.keyCode === 68){
        vel.x = 1;
    }else if(e.keyCode === 81){
        zoom.out = true;
    }else if(e.keyCode === 69){
        zoom.in = true;
    }

    if(vel.x || vel.y){
        socket.emit('command', {
            type: 'setVel',
            vel: vel,
        });
    }
};

document.onkeyup = function(e){
    if(e.keyCode === 81){
        zoom.out = false;
    }else if(e.keyCode === 69){
        zoom.in = false;
    }
};


var Renderer = require('./renderer');
var renderer = new Renderer();
var rootContainer = new PIXI.Container();
var stage = new Stage({
    context: rootContainer,
    zoom: zoom,
    viewBounds: viewBounds,
    renderer: renderer,
});

setInterval(function(){
    _.each(users, function(user){
        user.tick();
    })
    renderer.render(rootContainer)
},16)



