var _ = require('lodash');
var Segment = require('./segment.js');


function Snake(options){
    options = options || {};

    this.segments = [];
    this.addSegment(options.initPos, options.initVel);
    this.length = options.length || 1;
    this.user = options.user;
}

Snake.prototype.addSegment = function(initPos, initVel){
    this.segments.push(new Segment({
        type: 'segment',
        snake: this,
        pos: initPos || {x:0, y:0},
        vel: initVel || {x:0, y:0},
        index: this.segments.length,
    }));
};

Snake.prototype.tick = function(){
    if(this.length > this.segments.length){
        this.addSegment();
    }

    for(var i = this.segments.length-1; i > 0; i--){
        this.segments[i].pos.x = this.segments[i-1].pos.x;
        this.segments[i].pos.y = this.segments[i-1].pos.y;
    }

    var head = this.segments[0];
    head.pos.x += head.vel.x;
    head.pos.y += head.vel.y;
};

Snake.prototype.state = function(){
    return _.map(this.segments, function(segment){
        return {
            pos: segment.pos,
            vel: segment.vel,
        };
    });
}

module.exports = Snake;