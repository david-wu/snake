var _ = require('lodash');



function KeyListener(state){

    this.state = state || {
        vel: {x:0,y:0},
        zoom: {},
    };
    this.triggers = [];

    document.onkeydown = this.keyDownHandler.bind(this);
    document.onkeyup = this.keyUpHandler.bind(this);
}

KeyListener.prototype.keyDownHandler = function(e){
    if(e.keyCode === 87 || e.keyCode === 38){
        this.state.vel.y = -1;
        this.state.vel.x = 0;
    }else if(e.keyCode === 65 || e.keyCode === 37){
        this.state.vel.y = 0;
        this.state.vel.x = -1;
    }else if(e.keyCode === 83 || e.keyCode === 40){
        this.state.vel.y = 1;
        this.state.vel.x = 0;
    }else if(e.keyCode === 68 || e.keyCode === 39){
        this.state.vel.y = 0;
        this.state.vel.x = 1;
    }else if(e.keyCode === 81){
        this.state.zoom.out = true;
    }else if(e.keyCode === 69){
        this.state.zoom.in = true;
    }else if(e.keyCode === 70){
        this.state.f = true;
    }
    this.checkTriggers('down');
};

KeyListener.prototype.keyUpHandler = function(e){
    if(e.keyCode === 81){
        this.state.zoom.out = false;
    }else if(e.keyCode === 69){
        this.state.zoom.in = false;
    }else if(e.keyCode === 70){
        this.state.f = false;
    }
    this.checkTriggers('up');
};

KeyListener.prototype.addTrigger = function(trigger){
    this.triggers.push(trigger);
};

KeyListener.prototype.checkTriggers = function(upDown){
    var that = this;
    _.each(this.triggers, function(trigger){
        if(trigger.condition(that.state, upDown)){
            trigger.callback(that.state, upDown);
        }
    });
};

module.exports = KeyListener;
