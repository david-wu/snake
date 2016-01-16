var _ = require('lodash');



function BaseUnit(){}

BaseUnit.configs = {
    particle: true,
    Constructor: BaseUnit,
};

BaseUnit.prototype.add = function(sprite){
    this.spritesByName[sprite.name] = sprite;
    this.container.addChild(sprite.container);
};

BaseUnit.prototype.remove = function(sprite){
    delete this.spritesByName[sprite.name];
    this.container.removeChild(sprite.container);
};

BaseUnit.prototype.destroy = function(){
    this.parent.remove(this);
};

BaseUnit.prototype.defaultSprite = function(){
    var sprite = new PIXI.Sprite.fromImage(this.spritePath || './pie.jpg');
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.width = 50;
    sprite.height = 50;
    return sprite;
}

BaseUnit.prototype.draw = function(){
    if(!this.pos){return;}
    // this.container.position.x = this.pos.x*50;
    // this.container.position.y = this.pos.y*50;

    this.container.position.x = this.container.position.x || this.pos.x*50;
    this.container.position.y = this.container.position.y || this.pos.y*50;
    var deltaX = (this.pos.x*50) - this.container.position.x;
    var deltaY = (this.pos.y*50) - this.container.position.y;
    this.container.position.x += deltaX/5;
    this.container.position.y += deltaY/5;
};


module.exports = BaseUnit;

