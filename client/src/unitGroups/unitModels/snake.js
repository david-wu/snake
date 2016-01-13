var BaseUnit = require('./_baseUnit.js')



function Snake(options){
    BaseUnit.call(this);
    this.id = options.id;
    this.container = this.defaultSprite();
}

Snake.configs = {
    name: 'snake',
    Constructor: Snake,
};

Snake.prototype = Object.create(BaseUnit.prototype);
Snake.prototype.constructor = BaseUnit;

module.exports = Snake;