var unitId = 0;



function BaseUnit(){
    this.id = unitId++;
}

BaseUnit.prototype.remove = function(){
    if(this.manager){
        this.manager.removeUnit(this);
    }
};


BaseUnit.prototype.collideWith = function(){

}

BaseUnit.prototype.state = function(){
    return {
        type: this.type,
        id: this.id,
        pos: this.pos,
    };
};

module.exports = BaseUnit;

