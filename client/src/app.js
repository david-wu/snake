_ = require('lodash');
var io = require('socket.io-client');
var UserGroup = require('./userGroup');
var FoodGroup = require('./foodGroup');
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
    centerOn: function(){}
});

var userGroup = new UserGroup({context: stage.container});
var foodGroup = new FoodGroup({context: stage.container});

var socket = io.connect(location.origin);
socket.on('state', function(res){
    userGroup.updateState(res.users);
    foodGroup.updateState(res.foods);
});


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


setInterval(function(){
    // Centers view on first snake
    if(!_.values(userGroup.users)[0]){return;}
    var snake = _.values(userGroup.users)[0].snake;
    var center = snake[0].pos;
    var width = viewBounds[2]-viewBounds[0];
    var height = viewBounds[3]-viewBounds[1];
    viewBounds[0] = (center.x*20)-(width/2)
    viewBounds[1] = (center.y*20)-(height/2)
    viewBounds[2] = (center.x*20)+(width/2)
    viewBounds[3] = (center.y*20)+(height/2)
    stage.render();
}, 16)



