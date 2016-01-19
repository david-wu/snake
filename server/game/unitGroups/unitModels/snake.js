var _ = require('lodash');
var BaseUnit = require('./_baseUnit');
var Segment = require('./segment.js');

function Snake(options){
    BaseUnit.call(this);
    _.extend(this, options);

    this.type = 'snake';

    this.segments = [];
    this.user = options.user;
}

Snake.configs = {
    name: 'snake',
    Constructor: Snake,
};


Snake.prototype = Object.create(BaseUnit.prototype);
Snake.prototype.constructor = BaseUnit;

Snake.prototype.addSegment = function(segment){
    var head = _.last(this.segments);
    segment.pos = head ? _.clone(head.pos) : segment.pos;
    segment.vel = head ? _.last(this.segments).vel : {x:0, y:0};
    segment.snake = this;
    segment.index = this.segments.length;

    this.segments.push(segment);
};

Snake.prototype.freeSegments = function(){
    _.each(this.segments, function(segment){
        delete segment.snake;
    });
    this.segments.length = 0;
};

Snake.prototype.tick = function(diffs){

    for(var i=0; i < this.segments.length-1; i++){
        this.segments[i].moveTo(this.segments[i+1].pos.x, this.segments[i+1].pos.y);
    }

    var head = _.last(this.segments);
    if(head){
        head.moveTo(head.pos.x+head.vel.x, head.pos.y+head.vel.y);
    }

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