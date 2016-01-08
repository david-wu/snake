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
var viewBounds = [-1250, -1250, 1250, 1250];
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

var hud = new Hud({
    renderer: renderer,
    newSnake: function(callback){
        return new Promise(function(resolve, rej){
            socket.emit('command', {
                type: 'newSnake'
            }, function(response){
                resolve(response);
            });
        });
    },
});
rootContainer.addChild(hud.container);


var foodGroup = new FoodGroup({context: stage.container});
var userGroup = new UserGroup({context: stage.container});

var socket = io.connect(location.origin);

socket.on('state', function(res){
    // console.log(res.foods)
        // console.log(_.filter(res.foods, function(d){return d.type === 'powerup'}))


    foodGroup.updateState(res.foods);
    userGroup.updateState(res.users);
    stage.center();
    stage.transformContainer();
});

socket.on('myId', function(id){
    stage.centerPos = function(){
        var user = userGroup.contents[id];
        var snakeHead = user && user.snake && user.snake[0];
        if(snakeHead){
            return snakeHead.pos
        }
        return {x:0, y:0};
    };
});

socket.on('updateUsers', function(res){
    userGroup.updateState(res)
    stage.center();
    stage.transformContainer();
});

socket.on('addFood', function(res){
    foodGroup.add(foodGroup.createItem(res));
});

socket.on('removeFood', function(res){
    foodGroup.remove(res);
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



