var unitId = 0;



function BaseUnit(){
    this.id = unitId++;
}

BaseUnit.prototype.state = function(){
    return {
        type: this.type,
        id: this.id,
        pos: this.pos,
    }
}

BaseUnit.prototype.remove = function(){
    if(this.manager){
        this.manager.removeUnit(this);
    }
};


module.exports = BaseUnit;

