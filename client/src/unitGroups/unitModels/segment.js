var BaseUnit = require('./_baseUnit.js')



function Segment(options){
    BaseUnit.call(this);
    this.id = options.id;
    this.flavor = options.flavor;
// console.log(this.flavor)
    this.spritePath = this.getSpritePath(options.flavor);
    this.container = this.defaultSprite();
}

Segment.configs = {
    name: 'segment',
    Constructor: Segment,
};

Segment.prototype = Object.create(BaseUnit.prototype);
Segment.prototype.constructor = BaseUnit;

Segment.prototype.getSpritePath = function(flavor){
    switch(this.flavor){
        case 0:
            return './blueSegment.jpg';
        case 1:
            return './greenSegment.jpg';
        case 2:
            return './orangeSegment.jpg';
        case 3:
            return './pinkSegment.jpg';
        case 4:
            return './yellowSegment.jpg';
    }
}

module.exports = Segment;