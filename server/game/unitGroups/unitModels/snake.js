var _ = require('lodash');
var BaseUnit = require('./_baseUnit');
var Segment = require('./segment.js');

function Snake(options){
    BaseUnit.call(this);
    _.extend(this, options);

    this.type = 'snake';

    this.segments = [];
    // this.addSegment();
    // this.size = this.size || 1;
    this.user = this.user;
}

Snake.configs = {
    name: 'snake',
    Constructor: Snake,
};


Snake.prototype = Object.create(BaseUnit.prototype);
Snake.prototype.constructor = BaseUnit;


Snake.prototype.addSegment = function(){
    this.segments.push(new Segment({
        board: this.board,
        type: 'segment',
        snake: this,
        flavor: 0,
        pos: {x:0, y:0},
        vel: {x:0, y:0},
        index: this.segments.length,
    }));
};

Snake.prototype.tick = function(diffs){
    // if(this.size > this.segments.length){
    //     this.addSegment();
    // }

    for(var i = this.segments.length-1; i > 0; i--){
        this.segments[i].moveTo(this.segments[i-1].pos.x, this.segments[i-1].pos.y);
        // this.segments[i].pos.x = this.segments[i-1].pos.x;
        // this.segments[i].pos.y = this.segments[i-1].pos.y;
        // this.diffs.push(this.segments[i].state())
    }

    var head = this.segments[0];
    head.moveTo(head.pos.x+head.vel.x, head.pos.y+head.vel.y)
    // head.pos.x += head.vel.x;
    // head.pos.y += head.vel.y;
    // this.diffs.push(this.segments[0].state())
};

// State as far as the client is concerned
Snake.prototype.state = function(){
    return {
        id: this.id,
        type: this.type,
        segments: _.pluck(this.segments, 'id'),
    };
};

module.exports = Snake;