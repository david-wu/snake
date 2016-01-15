

function Stage(options){
    _.extend(this, options);
    this.container = new PIXI.Container();
    this.viewBounds = options.viewBounds || [-1250, -1250, 1250, 1250];

    var that = this;
    setInterval(function(){
        if(that.zoom.in){
            that.zoomIn();
            // that.center();
            // that.transformContainer();
        }
        if(that.zoom.out){
            that.zoomOut();
        }
            that.center();
            that.transformContainer();

    }, 16);
}

Stage.prototype.center = function(bounds){
    var center = this.centerPos();
    var width = this.viewBounds[2] - this.viewBounds[0];
    var height = this.viewBounds[3] - this.viewBounds[1];
    // this.viewBounds[0] = (center.x*50) - (width/2);
    // this.viewBounds[1] = (center.y*50) - (height/2);
    // this.viewBounds[2] = (center.x*50) + (width/2);
    // this.viewBounds[3] = (center.y*50) + (height/2);

    var deltaX = (this.viewBounds[0] + (this.viewBounds[2] - this.viewBounds[0])/2) - (center.x*50)
    var deltaY = (this.viewBounds[1] + (this.viewBounds[3] - this.viewBounds[1])/2) - (center.y*50)

    this.viewBounds[0] -= deltaX/60
    this.viewBounds[1] -= deltaY/60
    this.viewBounds[2] -= deltaX/60
    this.viewBounds[3] -= deltaY/60

    // this.viewBounds[2] = (center.x*50) + (width/2);
    // this.viewBounds[3] = (center.y*50) + (height/2);

};

Stage.prototype.zoomIn = function(ratio){
    ratio = ratio || 0.01;
    var verticalScrollAmount = (this.viewBounds[3]-this.viewBounds[1])*0.01;
    var horizontalScrollAmount = (this.viewBounds[2]-this.viewBounds[0])*0.01;
    this.viewBounds[1]+=verticalScrollAmount;
    this.viewBounds[3]-=verticalScrollAmount;
    this.viewBounds[0]+=horizontalScrollAmount;
    this.viewBounds[2]-=horizontalScrollAmount;
};

Stage.prototype.zoomOut = function(ratio){
    var verticalScrollAmount = (this.viewBounds[3]-this.viewBounds[1])*0.01;
    var horizontalScrollAmount = (this.viewBounds[2]-this.viewBounds[0])*0.01;
    if(this.zoom.out){
        this.viewBounds[1]-=verticalScrollAmount;
        this.viewBounds[3]+=verticalScrollAmount;
        this.viewBounds[0]-=horizontalScrollAmount;
        this.viewBounds[2]+=horizontalScrollAmount;
    }
};

Stage.prototype.transformContainer = function(){
    var xScale = this.renderer.width/(this.viewBounds[2]-this.viewBounds[0]);
    var yScale = this.renderer.height/(this.viewBounds[3]-this.viewBounds[1]);
    this.container.scale.x = xScale;
    this.container.scale.y = yScale;
    this.container.position.x = -this.viewBounds[0] * xScale;
    this.container.position.y = -this.viewBounds[1] * yScale;
};

Stage.prototype.tween = function(currentTime, x0, v, totalTime){

}

Stage.prototype.centerPos = function(){
    if(this.centerUnit){
        // var currentCenter = [this.viewBounds[2]-this.viewBounds[0], this.viewBounds[3]-this.viewBounds[1]];

        // var totalXDiff = this.centerUnit.pos.x - currentCenter[0];
        // var totalYDiff = this.centerUnit.pos.y - currentCenter[1];

        return this.centerUnit.pos;
    }
    return {x:0, y:0};
};

Stage.prototype.render = function(){
    this.renderer.render(this.context);
};

module.exports = Stage;