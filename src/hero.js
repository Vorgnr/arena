'use strict';

function Hero(x, y, image) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.image = image;
    this.size = 32;
};

Hero.prototype.isOutOfRectangle = function(x, y, width, height) {
    return this.x < x || this.y < y || this.x + this.size > x + width || this.y + size > y + height;
};

Hero.prototype.canGoLeftOf = function(x) {
    return this.x - this.speed >= x;
};

Hero.prototype.canGoUpOf = function(y) {
    return this.y - this.speed >= y;
};

Hero.prototype.canGoRightOf = function(x) {
    return this.x + this.size + this.speed < x
};

Hero.prototype.canGoDownOf = function(y) {
    return this.y + this.size + this.speed < y
};

module.exports = Hero;