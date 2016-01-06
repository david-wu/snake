



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
        if(!newState[itemId]){
            item.delete();
            delete that.contents[itemId];
        }
    });
};

BaseGroup.prototype.addMissing = function(){};

BaseGroup.prototype.updateExisting = function(){};

BaseGroup.prototype.tick = function(){
    _.each(this.contents, function(item){
        item.tick();
    });
};


module.exports = BaseGroup;