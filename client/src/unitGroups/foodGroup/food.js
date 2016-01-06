



function Food(options){
    this.id = options.id;
    this.container = new PIXI.Container();
    this.spritePath = './pie.jpg';
}

Food.prototype.tick = function(){
    this.draw();
}

Food.prototype.draw = function(){
    if(!this._sprite){
        this._sprite = new PIXI.Sprite.fromImage(this.spritePath)
        this._sprite.anchor.x = 0.5;
        this._sprite.anchor.y = 0.5;
        this._sprite.width = 50;
        this._sprite.height = 50;
        this.container.addChild(this._sprite);
    }

    this._sprite.position.x = this.pos.x * 50;
    this._sprite.position.y = this.pos.y * 50;
}

Food.prototype.delete = function(){
    if(this._sprite){
        this.container.removeChild(this._sprite);
    }
}

module.exports = Food;