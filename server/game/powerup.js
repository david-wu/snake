


var powerupId = 0;
function Powerup(options){
    this.id = powerupId--;
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

Powerup.prototype.remove = function(){};

Powerup.prototype.state = function(){
    return {
        id: this.id,
        pos: this.pos,
        type: this.type,
    };
};

module.exports = Powerup;