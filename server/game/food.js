


var foodId = 0;
function Food(options){
    this.id = foodId++;
    this.pos = options.pos;
    this.type = 'food';
    this.foods = options.foods;
}

Food.createRandom = function(options){
    var xRange = options.xRange;
    var yRange = options.yRange;
    return new Food({
        pos: {
            x: Math.round(xRange[0] + Math.random()*(xRange[1]-xRange[0])),
            y: Math.round(yRange[0] + Math.random()*(yRange[1]-yRange[0])),
        },
        foods: options.foods,
    });
};

Food.prototype.remove = function(){
    for(var i = 0; i < this.foods.length; i++){
        if(this.foods[i] === this){
            this.foods.splice(i, 1);
        }
    }
};

Food.prototype.state = function(){
    return {
        id: this.id,
        pos: this.pos,
    };
};

module.exports = Food;