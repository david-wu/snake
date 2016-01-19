var http = require('http');
var express = require('express');
var Io = require('socket.io');
var Game = require('./game');


var server = http.createServer();
server.listen(9999);

var app = strapApp(express());
app.use('/', express.static('../client/dist/production'));
server.on('request', app);


var game = new Game().start();
Io(server)
    .on('connection', function(socket){

        var player = game.createPlayer({
            socket: socket,
        });

        socket.on('disconnect', function(){
            game.removePlayer(player);
        });

        socket.on('newSnake', function(){
            game.removePlayer(player);
            player = game.createPlayer({
                socket: socket,
            });
        });

    });


function strapApp(app){
    var cors = require('cors');
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(cors());
    return app;
}

module.exports = server;