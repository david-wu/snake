


var foodId = 0;
function Food(options){
    this.id = foodId++;
    this.type = 'food';
    this.pos = options.pos;
}

Food.createRandom = function(options){
    var xRange = options.xRange;
    var yRange = options.yRange;
    return new Food({
        pos: {
            x: Math.round(xRange[0] + Math.random()*(xRange[1]-xRange[0])),
            y: Math.round(yRange[0] + Math.random()*(yRange[1]-yRange[0])),
        },
    });
};

Food.prototype.remove = function(){};

Food.prototype.state = function(){
    return {
        id: this.id,
        pos: this.pos,
    };
};

module.exports = Food;