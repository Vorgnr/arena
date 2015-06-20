'use strict'

module.exports = function() {
    var keysDown = {};
    keysDown.isLeftClickDown = false;

    var isEventLeftClick = function(e) {
        return e.which === 1;
    };

    document.addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    document.addEventListener("mousedown", function (e) {
        //left click
        if (isEventLeftClick(e))
            keysDown.isLeftClickDown = true;
    });

    document.addEventListener("mouseup", function (e) {
        //left click
        if (isEventLeftClick(e))
            keysDown.isLeftClickDown = false;
    });


    return {
        getKeysDown: function() {
            return keysDown;
        }
    };
};