function Renderer(){
    var renderOptions = {
        antialias: false,
        resolution: 1,
        transparent: true,
    };

    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, renderOptions);

    renderer.view._onMouseDown = [];
    renderer.view.onmousedown = function(e){
        _.each(renderer.view._onMouseDown, function(fn){
            fn(e);
        });
    };

    renderer.view._onMouseMove = [];
    renderer.view.onmousemove = function(e){
        _.each(renderer.view._onMouseMove, function(fn){
            fn(e);
        });
    };

    renderer.view._onMouseUp = [];
    renderer.view.onmouseup = function(e){
        _.each(renderer.view._onMouseUp, function(fn){
            fn(e);
        });
    };

    renderer.fullScreen = fullScreen;
    renderer.windowScreen = windowScreen;
    renderer.toggleScreen = toggleScreen;
    renderer.fullScreenEl = fullScreenEl;
    renderer.autoResize = true;

    window.addEventListener('resize', function(){
        renderer.resize(window.innerWidth, window.innerHeight)
    }, false);

    document.body.appendChild(renderer.view);
    document.body.style.overflow = 'hidden';
    document.body.style.margin = 0;

    return renderer;
}


function toggleScreen(element){
    if(fullScreenEl()){
        windowScreen()
    }else{
        fullScreen(element)
    }
}

function fullScreenEl(){
    return document.fullscreenElement ||  document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
}

function windowScreen(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function fullScreen(element){
    element = element || document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}

module.exports = Renderer;