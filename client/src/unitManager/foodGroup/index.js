var _ = require('lodash');
var BaseGroup = require('../_baseGroup.js');
var Food = require('../units/food.js');

function FoodGroup(options){
    this.contents = {};
    this.container = new PIXI.ParticleContainer();
    if(options.context){
        options.context.addChild(this.container);
    }
}

FoodGroup.prototype = Object.create(BaseGroup.prototype);
FoodGroup.prototype.constructor = FoodGroup;


FoodGroup.prototype.createItem = function(food){
    return new Food({
        id: food.id,
        name: food.name,
        type: food.type,
    });
}


FoodGroup.prototype.updateItem = function(item){
    var food = this.contents[item.id]
    if(food){
        food.pos = item.pos;
    }
}

module.exports = FoodGroup;