var BaseUnit = require('./_baseUnit');



function Powerup(options){
    BaseUnit.call(this);

    this.type = 'powerup';
    this.pos = options.pos;
}

Powerup.createRandom = function(options){
    var xRange = options.xRange;
    var yRange = options.yRange;
    return new Powerup({
        pos: {
            x: Math.round(xRange[0] + Math.random()*(xRange[1]-xRange[0])),
            y: Math.round(yRange[0] + Math.random()*(yRange[1]-yRange[0])),
        },
    });
};

Powerup.prototype = Object.create(BaseUnit.prototype);
Powerup.prototype.constructor = BaseUnit;


module.exports = Powerup;