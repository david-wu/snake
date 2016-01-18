var BaseUnit = require('./_baseUnit');



function Powerup(options){
    BaseUnit.call(this);
    this.type = 'powerup';
    this.pos = options.pos;
    _.extend(this, options);
}

Powerup.configs = {
    name: 'powerup',
    Constructor: Powerup,
};

Powerup.prototype = Object.create(BaseUnit.prototype);
Powerup.prototype.constructor = BaseUnit;


module.exports = Powerup;