

function Stage(options){
    _.extend(this, options)
    this.container = new PIXI.Container()

    if(this.context){
        this.context.addChild(this.container);
    }


    var that = this;
    setInterval(function(){
        var verticalScrollAmount = (that.viewBounds[3]-that.viewBounds[1])*0.01;
        var horizontalScrollAmount = (that.viewBounds[2]-that.viewBounds[0])*0.01;

        if(that.zoom.in){
            that.viewBounds[1]+=verticalScrollAmount;
            that.viewBounds[3]-=verticalScrollAmount;
            that.viewBounds[0]+=horizontalScrollAmount;
            that.viewBounds[2]-=horizontalScrollAmount;
        }
        if(that.zoom.out){
            that.viewBounds[1]-=verticalScrollAmount;
            that.viewBounds[3]+=verticalScrollAmount;
            that.viewBounds[0]-=horizontalScrollAmount;
            that.viewBounds[2]+=horizontalScrollAmount;
        }
        that.transformContainer();
    }, 16)
}

Stage.prototype.transformContainer = function(){
    var xScale = this.renderer.width/(this.viewBounds[2]-this.viewBounds[0]);
    var yScale = this.renderer.height/(this.viewBounds[3]-this.viewBounds[1]);

    this.container.scale.x = xScale;
    this.container.scale.y = yScale;

    this.container.position.x = -this.viewBounds[0]*xScale;
    this.container.position.y = -this.viewBounds[1]*yScale;
}

module.exports = Stage;