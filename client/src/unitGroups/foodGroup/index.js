var _ = require('lodash');
var BaseGroup = require('../_baseGroup.js');
var Food = require('./food.js');

function FoodGroup(options){
    this.contents = {};
    this.container = new PIXI.ParticleContainer();
    if(options.context){
        options.context.addChild(this.container);
    }
}

FoodGroup.prototype = Object.create(BaseGroup.prototype);
FoodGroup.prototype.constructor = FoodGroup;

FoodGroup.prototype.addMissing = function(newState){
    var that = this;
    _.each(newState, function(food, foodId){
        if(!that.contents[foodId]){
            that.contents[foodId] = new Food({
                id: foodId,
                name: food.name,
            });
            that.container.addChild(that.contents[foodId].container);
        }
    });
};

FoodGroup.prototype.updateExisting = function(newState){
    _.each(this.contents, function(food, foodId){
        food.pos = newState[foodId].pos;
    });
};

module.exports = FoodGroup;