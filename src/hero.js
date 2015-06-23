'use strict';

function Hero(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.size = 32;
    this.isReady = false;
    
    this.image = new Image();
    this.image.onload = function () {
        this.isReady = true;
    };
    this.image.src = "images/hero.png";
};

Hero.prototype.isOutOfRectangle = function(x, y, width, height) {
    return this.x < x || this.y < y || this.x + this.size > x + width || this.y + this.size > y + height;
};

Hero.prototype.canGoLeftOf = function(x) {
    return this.x - this.speed >= x;
};

Hero.prototype.canGoUpOf = function(y) {
    return this.y - this.speed >= y;
};

Hero.prototype.canGoRightOf = function(x) {
    return this.x + this.size + this.speed < x;
};

Hero.prototype.canGoDownOf = function(y) {
    return this.y + this.size + this.speed < y;
};

Hero.prototype.moveUp = function() {
    this.y -= this.speed;
    this.isMovingUp = true;
};

Hero.prototype.moveLeft = function() {
    this.x -= this.speed;
    this.isMovingLeft = true;
};

Hero.prototype.moveRight = function() {
    this.x += this.speed;
    this.isMovingRight = true;
};

Hero.prototype.moveDown = function() {
    this.y += this.speed;
    this.isMovingDown = true;
};

module.exports = Hero;