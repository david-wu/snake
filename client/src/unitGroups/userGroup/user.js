



function User(options){
    this.id = options.id;
    this.name = options.name;
    this.snake = options.snake;
    this.renderer = options.renderer;
    this.viewBounds = options.viewBounds;
    this.container = new PIXI.Container();
    this.snakeSprites = [];
    this.snakeBodySpritePath = './lemon.jpg'

    this.drawSnake();
}

User.prototype.tick = function(){
    this.drawSnake();
};

User.prototype.drawSnake = function(){
    if(!this.snake || !this.snake.length){return;}
    for(var i = 0; i < this.snake.length; i++){
        this.drawSnakeSegment(i, this.snake[i]);
    }
    this.drawName();
}

User.prototype.drawSnakeSegment = function(i, segment){
    if(!this.snakeSprites[i]){
        this.snakeSprites[i] = new PIXI.Sprite.fromImage(this.snakeBodySpritePath);
        this.snakeSprites[i].anchor.x = 0.5;
        this.snakeSprites[i].anchor.y = 0.5;
        this.snakeSprites[i].width = 50;
        this.snakeSprites[i].height = 50;
        this.snakeSprites[i].zIndex = 0;
        this.container.addChild(this.snakeSprites[i]);
        this.sortContainer();
    }
    this.snakeSprites[i].position.x = this.snake[i].pos.x * 50;
    this.snakeSprites[i].position.y = this.snake[i].pos.y * 50;
};

User.prototype.drawName = function(){
    if(!this._nameSprite){
        this._nameSprite = new PIXI.Text(this.name);
        this._nameSprite.anchor.x = 0.5;
        this._nameSprite.anchor.y = 0.5;
        this._nameSprite.zIndex = 2;
        this.container.addChild(this._nameSprite);
        this.sortContainer();
    }
    this._nameSprite.position.x = this.snake[0].pos.x * 50;
    this._nameSprite.position.y = this.snake[0].pos.y * 50;
}

User.prototype.sortContainer = function(){
    this.container.children.sort(function(a,b){
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;
        return a.zIndex-b.zIndex;
    });
}

module.exports = User;