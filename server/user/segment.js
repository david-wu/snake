var _ = require('lodash');



function Segment(options){
    _.extend(this, options);
}

Segment.prototype.collideWith = function(things){
    for(var i = 0; i < things.length; things++){
        if(things[i].type === 'food'){
            this.snake.size++;
            things[i].remove();
        }
        if(things[i].type === 'segment'){
            if(things[i].index === 0){
                things[i].snake.user.remove();
            }else{
                this.snake.user.remove();
            }
        }
        if(things[i].type === 'powerup'){
            this.snake.user.invertControls();
            things[i].remove();
        }
    }
};

module.exports = Segment;