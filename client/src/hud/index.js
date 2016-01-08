var _ = require('lodash');
var Menu = require('./menu');


function Hud(options){
    var that = this;
    _.extend(this, options);

    this.container = new PIXI.Container();

    this.items = [
        {
            name: 'restart',
            click: function(e){
                that.newSnake()
                    .then(function(res){
                        console.log(res);
                    });
                    console.log('restart')
            },
        },
        {
            name: 'fullScreen',
            click: function(e){
                that.renderer.toggleScreen();
            },
        },
    ];
    this.items.dims = [this.renderer.width, 50];

    this.menu = new Menu(this.items);
    this.menu.drawItems();
    this.container.addChild(this.menu.items._graphics);
}

Hud.prototype.draw = function(){
    this.items.dims = [this.renderer.width, 50];
    this.menu.drawItems();
}


module.exports = Hud;