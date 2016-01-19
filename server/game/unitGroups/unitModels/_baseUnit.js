var unitId = 0;



function BaseUnit(){
    this.id = unitId++;
}

BaseUnit.prototype.tick = function(){};

BaseUnit.prototype.collideWith = function(){};

BaseUnit.prototype.moveTo = function(x,y){
    this.board.removeUnit(this);
    this.pos.x = x;
    this.pos.y = y;
    this.board.addUnit(this);
    this.diffs.push(this.state());
}

BaseUnit.prototype.processAttrs = function(attrs){
    var that = this;
    _.each(attrs, function(value, attrName){
        _.set(that, attrName, value);
    });
};

BaseUnit.prototype.remove = function(){
    if(this.manager){
        this.manager.removeUnit(this);
    }
};

BaseUnit.prototype.state = function(){
    return {
        type: this.type,
        id: this.id,
        pos: this.pos,
    };
};

BaseUnit.prototype.randomizePosition = function(range){
    var pos = randomPos(range);
    this.moveTo(pos.x, pos.y);
};


function randomPos(range){
    range = range || [];
    var xRange = range[0] || [-100, 100];
    var yRange = range[1] || [-100, 100];
    return {
        x: Math.round(xRange[0] + Math.random()*(xRange[1]-xRange[0])),
        y: Math.round(yRange[0] + Math.random()*(yRange[1]-yRange[0])),
    };
}


module.exports = BaseUnit;

