var _ = require('lodash');
var BaseUnit = require('./_baseUnit');


function Segment(options){
    BaseUnit.call(this);
    this.type = 'segment';
    _.extend(this, options);
}


Segment.prototype = Object.create(BaseUnit.prototype);
Segment.prototype.constructor = BaseUnit;


Segment.prototype.collideWith = function(things){
    var that = this;

    _.eachRight(things, function(thing){
        if(thing.type === 'segment'){
            if(that.snake){
                that.snake.segments.push(thing)
            }
            // that.snake.size++;
            // thing.remove();
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


Segment.prototype.state = function(){
    return {
        type: this.type,
        id: this.id,
        pos: this.pos,
        flavor: this.flavor,
    };
};


module.exports = Segment;