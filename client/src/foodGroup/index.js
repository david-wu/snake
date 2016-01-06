var _ = require('lodash');
var Food = require('./food.js');


function FoodGroup(options){
    this.foods = {};
    this.container = new PIXI.Container();
    if(options.context){
        options.context.addChild(this.container)
    }
}

FoodGroup.prototype.updateState = function(newState){
    this.removeMissing(newState);
    this.addNew(newState);
    this.updateExisting(newState);
    this.tick();
};

FoodGroup.prototype.removeMissing = function(newState){
    var that = this;
    _.each(this.foods, function(food, foodId){
        if(!newState[foodId]){
            food.delete();
            delete that.foods[foodId];
        }
    });
};

FoodGroup.prototype.addNew = function(newState){
    var that = this;
    _.each(newState, function(food, foodId){
        if(!that.foods[foodId]){
            that.foods[foodId] = new Food({
                id: foodId,
                name: food.name,
            });
            that.container.addChild(that.foods[foodId].container);
        }
    });
};

FoodGroup.prototype.updateExisting = function(newState){
    _.each(this.foods, function(food, foodId){
        food.pos = newState[foodId].pos;
    });
};

FoodGroup.prototype.tick = function(){
    _.each(this.foods, function(food){
        food.tick();
    });
};

module.exports = FoodGroup;