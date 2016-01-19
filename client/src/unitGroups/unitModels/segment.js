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
            return './gems/Gems_01_256x256_015.png';
        case 1:
            return './gems/Gems_01_256x256_020.png';
        case 2:
            return './gems/Gems_01_256x256_017.png';
        case 3:
            return './gems/Gems_01_256x256_018.png';
        case 4:
            return './gems/Gems_01_256x256_019.png';
        case 5:
            return './gems/Gems_01_256x256_021.png';
        case 6:
            return './gems/Gems_01_256x256_016.png';

    }
}

module.exports = Segment;


// function SegmentFactory(){
// }