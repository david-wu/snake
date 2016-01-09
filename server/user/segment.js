var _ = require('lodash');



function Segment(options){
    _.extend(this, options);
}

Segment.prototype.collideWith = function(things){
    var that = this;

    _.eachRight(things, function(thing){
        if(thing.type === 'food'){
            that.snake.size++;
            thing.remove();
        }
        if(thing.type === 'segment'){
            if(thing.index === 0){
                thing.snake.user.remove();
            }else{
                that.snake.user.remove();
            }
        }
        if(thing.type === 'powerup'){
            that.snake.user.invertControls();
            thing.remove();
        }
    });
};

module.exports = Segment;