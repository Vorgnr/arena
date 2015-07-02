'use strict';

module.exports = function() {
    var keysDown = {};
    
    var inputs = {
        "Up": [90],
        "Right": [68],
        "Down": [83],
        "Left": [81],
    };
    
    var keyCodeToAction = function(code) {
      for(var i in inputs) {
          if (~inputs[i].indexOf(code)) return i;
      };
      return undefined;
    };
    
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
        var action = keyCodeToAction(e.keyCode);
        if (action) keysDown[action] = true;
    }, false);

    document.addEventListener("keyup", function (e) {
        var action = keyCodeToAction(e.keyCode);
        if (action) delete keysDown[action];
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