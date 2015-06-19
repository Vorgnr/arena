'use strict';

function Drawer(context) {
    this.context = context;
};

Drawer.prototype.drawCircle = function(x, y, rayon) {
    this.context.beginPath();
    this.context.arc(x, y, rayon, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();
    this.context.stroke();
};

module.exports = Drawer;