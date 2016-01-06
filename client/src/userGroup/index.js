var _ = require('lodash');
var User = require('./user.js');


function UserGroup(options){
    this.users = {};
    this.container = new PIXI.Container();
    if(options.context){
        options.context.addChild(this.container)
    }
}

UserGroup.prototype.updateState = function(newState){
    this.removeMissing(newState);
    this.addNew(newState);
    this.updateExisting(newState);
    this.tick();
};

UserGroup.prototype.removeMissing = function(newState){
    var that = this;
    _.each(this.users, function(user, userId){
        if(!newState[userId]){
            user.delete();
            delete that.users[userId];
        }
    });
};

UserGroup.prototype.addNew = function(newState){
    var that = this;
    _.each(newState, function(user, userId){
        if(!that.users[userId]){
            that.users[userId] = new User({
                id: userId,
                name: user.name,
            });
            that.container.addChild(that.users[userId].container);
        }
    });
};

UserGroup.prototype.updateExisting = function(newState){
    _.each(this.users, function(user, userId){
        user.snake = newState[userId].snake;
    });
};

UserGroup.prototype.tick = function(){
    _.each(this.users, function(user){
        user.tick();
    });
};

module.exports = UserGroup;