_ = require('lodash');
var io = require('socket.io-client');
var FoodGroup = require('./unitGroups/foodGroup');
var UserGroup = require('./unitGroups/userGroup');
var Stage = require('./stage');
var Hud = require('./hud');
var KeyListener = require('./keyListener.js')
var Renderer = require('./renderer');


var rootContainer = new PIXI.Container();
var renderer = new Renderer();
var viewBounds = [-750, -750, 750, 750];
var keyState = {
    vel: {x:0,y:0},
    zoom: {},
};

var stage = new Stage({
    context: rootContainer,
    renderer: renderer,
    viewBounds: viewBounds,
    zoom: keyState.zoom,
    centerPos: function(){
        if(!_.values(userGroup.contents)[0]){return {x:0, y:0};}
        var snake = _.values(userGroup.contents)[0].snake;
        return snake[0].pos;
    },
});

var foodGroup = new FoodGroup({context: stage.container});
var userGroup = new UserGroup({context: stage.container});

var socket = io.connect(location.origin);
socket.on('state', function(res){
    foodGroup.updateState(res.foods);
    userGroup.updateState(res.users);
});


// This could be simpler
var kl = new KeyListener(keyState);
kl.addTrigger({
    condition: function(state){
        return _.xor(state.vel.x, state.vel.y);
    },
    callback: function(state){
        socket.emit('command', {
            type: 'setVel',
            vel: state.vel,
        });
    },
});
kl.addTrigger({
    condition: function(state, upDown){
        return upDown === 'down' && state.f;
    },
    callback: function(state){
        renderer.toggleScreen();
    },
});


setInterval(function(){
    stage.render();
}, 16)



