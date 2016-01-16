_ = require('lodash');
var io = require('socket.io-client');
var Renderer = require('./renderer');
var Stage = require('./stage');
var Hud = require('./hud');
var KeyListener = require('./keyListener.js')


var rootContainer = new PIXI.Container();
var renderer = new Renderer();

var keyState = {
    vel: {x:0,y:0},
    zoom: {},
};

var stage = new Stage({
    context: rootContainer,
    renderer: renderer,
    zoom: keyState.zoom,
});
rootContainer.addChild(stage.container);

var hud = new Hud({
    renderer: renderer,
});
rootContainer.addChild(hud.container);

var UnitGroups = require('./unitGroups')
var unitGroups = new UnitGroups();
stage.container.addChild(unitGroups.container);


var socket = io.connect(location.origin);

socket.on('diffs', function(diffs){
    _.each(diffs, function(diff){
        unitGroups.processDiff(diff);
    });
});

socket.on('myCenterUnit', function(diff){
    var unit = unitGroups.processDiff(diff)
    stage.centerUnit = unit;
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



