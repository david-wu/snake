



function BaseGroup(){}

BaseGroup.prototype.updateState = function(newState){
    this.removeStale(newState);
    this.addMissing(newState);
    this.updateExisting(newState);
    this.tick();
};

BaseGroup.prototype.removeStale = function(newState){
    var that = this;
    _.each(this.contents, function(item, itemId){
        if(newState[itemId]){return;}
        that.remove(item);
    });
};

BaseGroup.prototype.remove = function(item){
    item = this.contents[item.id];
    if(!item){return;}
    this.container.removeChild(item.container);
    delete this.contents[item.id];
}

BaseGroup.prototype.addMissing = function(newState){
    var that = this;
    _.each(newState, function(item, itemId){
        if(that.contents[itemId]){return;}
        that.add(that.createItem(item))
    });
};

BaseGroup.prototype.add = function(item){
    this.contents[item.id] = item;
    this.container.addChild(item.container);
};

BaseGroup.prototype.updateExisting = function(newState){
    var that = this;
    _.each(this.contents, function(item){
        that.updateItem(newState[item.id])
    });
};

BaseGroup.prototype.tick = function(){
    _.each(this.contents, function(item){
        item.tick();
    });
};


module.exports = BaseGroup;