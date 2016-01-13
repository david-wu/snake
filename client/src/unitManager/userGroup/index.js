var _ = require('lodash');
var BaseGroup = require('../_baseGroup.js');
var User = require('../units/user.js');

function UserGroup(options){
    this.contents = {};
    this.container = new PIXI.Container();
    this.itemConstructor = User;
    if(options.context){
        options.context.addChild(this.container);
    }
}

UserGroup.prototype = Object.create(BaseGroup.prototype);
UserGroup.prototype.constructor = UserGroup;

UserGroup.prototype.createItem = function(user){
    return new User({
        id: user.id,
        parent: this,
        name: user.name,
    });
};

UserGroup.prototype.updateItem = function(item){
    var user = this.contents[item.id]
    if(user){
        user.snake = item.snake;
    }
}

module.exports = UserGroup;