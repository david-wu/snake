var BaseUnit = require('./_baseUnit.js')



function Food(options){
    BaseUnit.call(this);
    this.id = options.id;
    this.container = this.defaultSprite();
}

Food.configs = {
    name: 'food',
    Constructor: Food,
};

Food.prototype = Object.create(BaseUnit.prototype);
Food.prototype.constructor = BaseUnit;


module.exports = Food;