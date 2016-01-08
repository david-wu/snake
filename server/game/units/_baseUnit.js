


var unitId = 0;
function BaseUnit(){
    this.id = unitId++;
}


BaseUnit.prototype.state = function(){
    return {
        id: this.id,
        pos: this.pos,
        type: this.type,
    }
}

BaseUnit.prototype.remove = function(){};






module.exports = BaseUnit;

