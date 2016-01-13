var BaseUnit = require('./_baseUnit');



function Food(options){
    BaseUnit.call(this);
    this.type = 'food';
    this.pos = options.pos;
}

Food.prototype = Object.create(BaseUnit.prototype);
Food.prototype.constructor = BaseUnit;


module.exports = Food;