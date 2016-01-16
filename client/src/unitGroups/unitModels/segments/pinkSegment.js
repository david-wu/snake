var BaseUnit = require('../_baseUnit.js')



function Segment(options){
    BaseUnit.call(this);
    this.id = options.id;
    this.flavor = options.flavor;
    this.spritePath = './pinkSegment.png';
    this.container = this.defaultSprite();
}

Segment.configs = {
    name: 'pinkSegment',
    Constructor: Segment,
    particle: true,
};

Segment.prototype = Object.create(BaseUnit.prototype);
Segment.prototype.constructor = BaseUnit;


module.exports = Segment;