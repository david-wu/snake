var _ = require('lodash');
var BaseUnit = require('./_baseUnit');


function Segment(options){
    BaseUnit.call(this);
    _.extend(this, options)
    this.type = 'segment';
}


Segment.prototype = Object.create(BaseUnit.prototype);
Segment.prototype.constructor = BaseUnit;


Segment.prototype.collideWith = function(things){
    var that = this;

    _.eachRight(things, function(thing){
        if(thing.type === 'food'){
            that.snake.size++;
            thing.remove();
        }
        // if(thing.type === 'segment'){
        //     if(thing.index === 0){
        //         thing.snake.remove();
        //     }else{
        //         that.snake.remove();
        //     }
        // }
        // if(thing.type === 'powerup'){
        //     that.snake.user.invertControls();
        //     thing.remove();
        // }
    });
};

module.exports = Segment;