var BaseUnit = require('./_baseUnit.js')

// hack
var gemSounds = [
    new Audio('./magicSound/1.ogg'),
    new Audio('./magicSound/2.ogg'),
    new Audio('./magicSound/4.ogg'),
    new Audio('./magicSound/5.ogg'),
    new Audio('./magicSound/1.ogg'),
    new Audio('./magicSound/2.ogg'),
    new Audio('./magicSound/4.ogg'),
    new Audio('./magicSound/5.ogg'),
    new Audio('./magicSound/1.ogg'),
    new Audio('./magicSound/2.ogg'),
    new Audio('./magicSound/4.ogg'),
    new Audio('./magicSound/5.ogg')
];
var playGemSound = (function(i){
    return function(){
        gemSounds[i++].play();
        if(i >=gemSounds.length){i = 0;}
    }
})(0);


function Snake(options){
    BaseUnit.call(this);

    _.extend(this, options);
    this.container = new PIXI.ParticleContainer();
}

Snake.configs = {
    name: 'snake',
    Constructor: Snake,
};

Snake.prototype = Object.create(BaseUnit.prototype);
Snake.prototype.constructor = BaseUnit;

// hack
Snake.prototype.getHead = function(){
    if(!this.segments || !this.segments.length){return;}
    var newHead = this.parent.parent.groupsByName['segment'].unitsById[_.last(this.segments)];
    if(this.prevHead !== newHead){
        playGemSound();
    }
    this.prevHead = newHead;
    return newHead;
}

module.exports = Snake;