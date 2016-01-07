

function Stage(options){
    _.extend(this, options);
    this.container = new PIXI.Container();

    if(this.context){
        this.context.addChild(this.container);
    }


    var that = this;
    setInterval(function(){
        if(that.zoom.in){
            that.zoomIn();
            that.center();
            that.transformContainer();
        }
        if(that.zoom.out){
            that.zoomOut();
            that.center();
            that.transformContainer();
        }
    }, 16);
}

Stage.prototype.center = function(bounds){
    var center = this.centerPos();
    var width = this.viewBounds[2] - this.viewBounds[0];
    var height = this.viewBounds[3] - this.viewBounds[1];
    this.viewBounds[0] = (center.x*50) - (width/2);
    this.viewBounds[1] = (center.y*50) - (height/2);
    this.viewBounds[2] = (center.x*50) + (width/2);
    this.viewBounds[3] = (center.y*50) + (height/2);
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

Stage.prototype.centerPos = function(){
    return {x:0, y:0};
};

Stage.prototype.render = function(){
    this.renderer.render(this.context);
};

module.exports = Stage;