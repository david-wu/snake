var BaseUnit = require('./_baseUnit.js')



function Food(options){
    BaseUnit.call(this);
    this.id = options.id;
    this.container = this.defaultSprite();
}

Food.configs = {
    name: 'food',
    Constructor: Food,
};

Food.prototype = Object.create(BaseUnit.prototype);
Food.prototype.constructor = BaseUnit;

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


module.exports = Food;