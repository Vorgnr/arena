'use strict'

module.exports = function(task) {
    var animFrame =   window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                null ;

    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    
    var animate = function() {
        if (animFrame !== null) {
            if (isFirefox) {
                var recursiveAnim = function() {
                    task();
                    animFrame();
                };

                window.addEventListener("MozBeforePaint", recursiveAnim, false);
                animFrame();
            } else {
                var recursiveAnim = function() {
                    task();
                    animFrame(recursiveAnim);
                };

                animFrame(recursiveAnim);
            }
        } else {
            var ONE_FRAME_TIME = 1000.0 / 30.0 ;
            setInterval(task, ONE_FRAME_TIME);
        }
    }

    return {
        start: function() {
            return animate();
        }
    };
};