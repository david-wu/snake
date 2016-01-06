var _ = require('lodash');



function Segment(options){
    _.extend(this, options);
}

Segment.prototype.collideWith = function(things){
    for(var i = 0; i < things.length; things++){
        if(things[i].type === 'food'){
            this.snake.length++;
            things[i].delete();
        }
        if(things[i].type === 'snake'){

        }
    }
}

module.exports = Segment;