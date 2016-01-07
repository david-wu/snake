var _ = require('lodash');



function Menu(items){
    this.items = items;
}

var childMargins = {
    left: 7,
    right: -5,
    top: 7,
    bottom: 7,
};

var childPaddings = {
    left: 7,
    top: 7,
};

var childDims = {
    width: 200,
    height: 40,
};

var childPos = {
    x: function(i){
        return childMargins.left + (i * (childMargins.left + childDims.width + childMargins.right));
    },
    y: function(i){
        return childMargins.top;
    },
};

Menu.prototype.drawItems = function(items){
    var that = this;


    _.each(this.items, function(item, i){
        if(!item._graphics){
            item._graphics = {
                container: new PIXI.Container(),
                box: that.createBox(item),
                text: new PIXI.Text(item.name, {
                    fill: 0xFFFFFF,
                    font: '16px Arial',
                    align: 'center',
                }),
            };
            item._graphics.text.position.x = childPaddings.left;
            item._graphics.text.position.y = childPaddings.top;

            item._graphics.container.addChild(item._graphics.box);
            item._graphics.container.addChild(item._graphics.text);
        }

        item._graphics.box.width = childDims.width;
        item._graphics.box.height = childDims.height;
        item._graphics.container.position.x = childPos.x(i);
        item._graphics.container.position.y = childPos.y(i);
    });

    if(!this.items._graphics){
        this.items._graphics = new PIXI.Graphics()
            .beginFill(0x00FF00)
            .lineStyle(5, 0xFF0000)
            .drawRect(0, 0, this.items.dims[0], this.items.dims[1]);


        _.each(this.items, function(item){
            that.items._graphics.addChild(item._graphics.container);
        });

    }
    this.items._graphics.width = this.items.dims[0];
    this.items._graphics.height = this.items.dims[1];

    return this.items._graphics;
}

Menu.prototype.createBox = function(item){
    var box = new PIXI.Graphics()
        .beginFill(0x0000FF)
        .lineStyle(5, 0x000000)
        .drawRect(0, 0, childDims.width, childDims.height);
    box.interactive = true;
    box.mousedown = function(){
        item.click();
    }
    return box;
}

module.exports = Menu;