var BaseUnit = require('./_baseUnit.js')



function Segment(options){
    BaseUnit.call(this);
    this.id = options.id;
    this.flavor = options.flavor;
    this.spritePath = this.getSpritePath(options.flavor);
    this.container = this.defaultSprite();
}

Segment.configs = {
    name: 'segment',
    Constructor: Segment,
    // particle: true,
};

Segment.prototype = Object.create(BaseUnit.prototype);
Segment.prototype.constructor = BaseUnit;

Segment.prototype.getSpritePath = function(flavor){
    switch(this.flavor){
        case 0:
            return './blueSegment.png';
        case 1:
            return './greenSegment.png';
        case 2:
            return './orangeSegment.png';
        case 3:
            return './pinkSegment.png';
        case 4:
            return './yellowSegment.png';
    }
}

module.exports = Segment;