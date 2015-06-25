'use strict';

module.exports = function() {
    var keysDown = {};
    keysDown.isLeftClickDown = false;

    var isEventLeftClick = function(e) {
        return e.which === 1;
    };
    
    var reset = function() {
        keysDown = {};
    };
        
    window.onblur = function() {
       reset();
    };

    document.addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    document.addEventListener("mousedown", function (e) {
        if (isEventLeftClick(e))
            keysDown.isLeftClickDown = true;
        else
            reset();  // Because Right click is annoying
    });

    document.addEventListener("mouseup", function (e) {
        if (isEventLeftClick(e))
            keysDown.isLeftClickDown = false;
    });

    return {
        getKeysDown: function() {
            return keysDown;
        }
    };
};