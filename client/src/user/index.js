
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
    for(var i = 0; i < this.snake.length; i++){
        this.drawSnakeSegment(i, this.snake[i]);
    }
}

User.prototype.drawSnakeSegment = function(i, segment){
    if(!this.snakeSprites[i]){
        this.snakeSprites[i] = new PIXI.Sprite.fromImage(this.snakeBodySpritePath);
        this.snakeSprites[i].anchor.x = 0.5;
        this.snakeSprites[i].anchor.y = 0.5;
        this.snakeSprites[i].width = 50;
        this.snakeSprites[i].height = 50;
        this.container.addChild(this.snakeSprites[i]);
    }
    this.snakeSprites[i].position.x = this.snake[i].pos.x * 50;
    this.snakeSprites[i].position.y = this.snake[i].pos.y * 50;
}

module.exports = User;