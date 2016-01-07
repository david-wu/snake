



function Food(options){
    this.id = options.id;
    this.spritePath = './pie.jpg';
    this.container = new PIXI.Sprite.fromImage(this.spritePath);
    this.container.anchor.x = 0.5;
    this.container.anchor.y = 0.5;
    this.container.width = 50;
    this.container.height = 50;
}

Food.prototype.tick = function(){
    this.draw();
}

Food.prototype.draw = function(){
    this.container.position.x = this.pos.x * 50;
    this.container.position.y = this.pos.y * 50;
}

Food.prototype.delete = function(){
    this.container.parent.removeChild(this.container)
}

module.exports = Food;