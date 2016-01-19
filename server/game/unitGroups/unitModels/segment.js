var _ = require('lodash');
var BaseUnit = require('./_baseUnit');


function Segment(options){
    BaseUnit.call(this);

    _.extend(this, options);
    _.defaults(this, {
        type: 'segment',
        pos: {x:0, y:0},
        vel: {x:0, y:0},
    })
}

Segment.configs = {
    name: 'segment',
    Constructor: Segment,
};


Segment.prototype = Object.create(BaseUnit.prototype);
Segment.prototype.constructor = BaseUnit;


Segment.prototype.collideWith = function(things){

    var that = this;

    _.each(things, function(thing){

        if(that.snake && thing.type === 'segment'){

            if(thing.snake){

                if(thing.snake === that.snake){

                    if(Math.abs(thing.index - that.index) > 3){
                        thing.snake.remove();
                    }

                }else{
                    if(thing.index === 0){
                        thing.snake.remove();
                    }else{
                        that.snake.remove();
                    }
                }

            }else{
                that.snake.addSegment(thing);
            }
        }

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