'use strict';

function Looper(task) {
    this.task = task;
}

(function () {

    var frameTime = 60/1000;
    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if (!window.requestAnimationFrame ) {
        window.requestAnimationFrame = function (callback, element ) {
            var currTime = Date.now(), timeToCall = Math.max( 0, frameTime - ( currTime - lastTime));
            var id = window.setTimeout(function() { callback( currTime + timeToCall ); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if ( !window.cancelAnimationFrame ) {
        window.cancelAnimationFrame = function (id) { clearTimeout(id); };
    }

}());

Looper.prototype.start = function(time) {
    this.deltaTime = this.lastFrametime ? ((time - this.lastFrametime) / 1000.0 ).toFixed(3) : 0.016;
    this.lastFrametime = time;
        
    this.task();
    this.id = window.requestAnimationFrame(this.start.bind(this));
};

module.exports = Looper;