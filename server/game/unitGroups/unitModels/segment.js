var _ = require('lodash');
var BaseUnit = require('./_baseUnit');


function Segment(options){
    BaseUnit.call(this);
    this.type = 'segment';
    this.pos = {x:0, y:0};
    this.vel = {x:0, y:0};
    _.extend(this, options);
}

Segment.configs = {
    name: 'segment',
    Constructor: Segment,
};


Segment.prototype = Object.create(BaseUnit.prototype);
Segment.prototype.constructor = BaseUnit;


Segment.prototype.collideWith = function(things){
    var that = this;

    _.eachRight(things, function(thing){
        if(thing.type === 'segment'){
            if(that.snake){
                that.snake.segments.push(thing);
            }
            if(thing.snake && that.snake){
                if(thing.index === 0){
                    thing.snake.remove();
                }else{
                    that.snake.remove();
                }
            }
        }
        // if(thing.type === 'powerup'){
        //     that.snake.user.invertControls();
        //     thing.remove();
        // }
    });
};


Segment.prototype.state = function(){
    return {
        type: this.type,
        id: this.id,
        pos: this.pos,
        flavor: this.flavor,
    };
};


module.exports = Segment;