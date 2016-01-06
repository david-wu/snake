var _ = require('lodash');
var BaseGroup = require('../_baseGroup.js');
var User = require('./user.js');

function UserGroup(options){
    this.contents = {};
    this.container = new PIXI.Container();
    if(options.context){
        options.context.addChild(this.container)
    }
}

UserGroup.prototype = Object.create(BaseGroup.prototype);
UserGroup.prototype.constructor = UserGroup;

UserGroup.prototype.addMissing = function(newState){
    var that = this;
    _.each(newState, function(user, userId){
        if(!that.contents[userId]){
            that.contents[userId] = new User({
                id: userId,
                name: user.name,
            });
            that.container.addChild(that.contents[userId].container);
        }
    });
};

UserGroup.prototype.updateExisting = function(newState){
    _.each(this.contents, function(user, userId){
        user.snake = newState[userId].snake;
    });
};

module.exports = UserGroup;