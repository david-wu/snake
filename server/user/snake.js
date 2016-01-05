
function Snake(options){
    options = options || {};
    this.segments = [{
        pos: options.initPos || {x:0, y:0},
        vel: options.initVel || {x:0, y:0},
    }];
    this.grow = options.grow || 0;
}

Snake.prototype.tick = function(){
    if(this.grow > 0){
        this.segments.push({pos:{},vel:{}});
        this.grow--;
    }

    for(var i = this.segments.length-1; i > 0; i--){
        this.segments[i].pos.x = this.segments[i-1].pos.x;
        this.segments[i].pos.y = this.segments[i-1].pos.y;
    }

    var head = this.segments[0];
    head.pos.x += head.vel.x;
    head.pos.y += head.vel.y;
};

module.exports = Snake;