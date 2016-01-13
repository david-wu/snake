var BaseUnit = require('./_baseUnit.js')



function Segment(options){
    BaseUnit.call(this);
    this.id = options.id;
    this.container = this.defaultSprite();
}

Segment.configs = {
    name: 'segment',
    Constructor: Segment,
};

Segment.prototype = Object.create(BaseUnit.prototype);
Segment.prototype.constructor = BaseUnit;


module.exports = Segment;