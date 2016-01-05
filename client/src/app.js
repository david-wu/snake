_ = require('lodash');
var io = require('socket.io-client');
var User = require('./user');

var socket = io.connect(location.origin);

socket.on('state', function(res){
    console.log(res)
    _.each(res.users, function(user, id){
        users[id] = new User(user);
    })
})


var Renderer = require('./renderer');
var renderer = new Renderer();

var users = {};




var scroll = {};
var zoom = {};
document.onkeydown = function(e){
    var vel = {};
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
// document.onkeyup = function(e){
//     if(e.keyCode === 87){
//         scroll.up = false;
//     }else if(e.keyCode === 65){
//         scroll.left = false;
//     }else if(e.keyCode === 83){
//         scroll.down = false;
//     }else if(e.keyCode === 68){
//         scroll.right = false;
//     }else if(e.keyCode === 81){
//         zoom.out = false;
//     }else if(e.keyCode === 69){
//         zoom.in = false;
//     }
// };



