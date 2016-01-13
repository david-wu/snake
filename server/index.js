var http = require('http');
var express = require('express');
var Io = require('socket.io');
var Game = require('./game');


var game = new Game().start();
var app = strapApp(express());
var server = http.createServer();


app.use('/', express.static('../client/dist/production'));

server.on('request', app);

Io(server)
    .on('connection', function(socket){

        var player = game.createPlayer({
            socket: socket
        });

        socket.on('disconnect', function(){
            game.removePlayer(player);
        });
    });

server.listen(9999);


function strapApp(app){
    var cors = require('cors');
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(cors());
    return app;
}

module.exports = server;