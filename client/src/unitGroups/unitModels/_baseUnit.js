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

BaseUnit.prototype.draw = function(){};

BaseUnit.prototype.destroy = function(){
    this.parent.remove(this);
};

BaseUnit.prototype.defaultSprite = function(){
    var sprite = new PIXI.Sprite.fromImage('./pie.jpg');
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.width = 50;
    sprite.height = 50;
    return sprite;
}

BaseUnit.prototype.draw = function(){
    if(!this.pos){return;}
    this.container.position.x = this.pos.x*50;
    this.container.position.y = this.pos.y*50;
};


module.exports = BaseUnit;




// var that = this;
// var pos = this.pos || this.parent.pos;
// var posCoord = pos.coords;
// this.stage = stage;

// if(!this.sprite){
//     if(!this.spritePath){return;}
//     this.sprite = new PIXI.Sprite.fromImage(this.spritePath);

//     this.sprite.anchor.x = 0.5;
//     this.sprite.anchor.y = 0.5;
//     this.sprite.tint = this.tint || 0xFFFFFF;
//     stage.addChild(this.sprite);
// }

// if(this.selected){
//     this.sprite.tint = 0x00FF00
// }else{
//     this.sprite.tint = this.tint;
// }
// this.sprite.position.x = posCoord[0];
// this.sprite.position.y = posCoord[1];
// this.sprite.width = this.radius*2;
// this.sprite.height = this.radius*2;

