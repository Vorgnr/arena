'use strict';

function Hero(x, y) {
    this.x = x;
    this.y = y;
    this.vectorX = 1;
    this.vectorY = 1;
    this.speed = 5;
    this.size = 30;
    this.isReady = false;
    this.resetMovementState();
    
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

Hero.prototype.move = function(deltaTime) {
    var pixelPerMs = Math.round(this.speed * deltaTime);
    this.x += pixelPerMs * this.vectorX;
    this.y += pixelPerMs * this.vectorY;
};

Hero.prototype.turnUp = function(deltaTime) {
    this.vectorY = -1;
    this.isMovingUp = true;
};

Hero.prototype.turnLeft = function(deltaTime) {
    this.vectorX = -1;
    this.isMovingLeft = true;
};

Hero.prototype.turnRight = function(deltaTime) {
    this.vectorX = 1;
    this.isMovingRight = true;
};

Hero.prototype.turnDown = function(deltaTime) {
    this.vectorY = 1;
    this.isMovingDown = true;
};

Hero.prototype.resetMovementState = function() {
    this.vectorX = 0;
    this.vectorY = 0;
    this.isMovingDown = false;
    this.isMovingUp = false;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isMovingStateChanged = false;
};

Hero.prototype.movementState = function() {
    return [this.isMovingUp, this.isMovingRight, this.isMovingLeft, this.isMovingDown];
};

Hero.prototype.isCollideWithObjectFromAbove = function(o) {
    return o.y <= this.y + this.speed + this.size 
        && this.y + this.speed <= o.y + o.height
        && o.x < this.x + this.size && this.x < o.x + o.width;
};

Hero.prototype.isCollideWithObjectFromBelow = function(o) {
    return o.y + o.height > this.y - this.speed
        && this.y + this.size > o.y
        && o.x < this.x + this.size && this.x < o.x + o.width;
};

Hero.prototype.isCollideWithObjectFromRight = function(o) {
    return o.x + o.width > this.x - this.speed &&
        this.x - this.speed > o.x &&
        o.y < this.y + this.size &&
        this.y < o.y + o.height;
};

Hero.prototype.isCollideWithObjectFromLeft = function(o) {
    return o.x < this.x + this.speed + this.size &&
        this.x + this.speed < o.x + o.width &&
        o.y < this.y + this.size && this.y < o.y + o.height;
};

Hero.prototype.isCollideWithObjectsFromRight = function(objects) {
    return objects.every(function(o) {
        return !this.isCollideWithObjectFromRight(o);
    }.bind(this));
};

Hero.prototype.isCollideWithObjectsFromLeft = function(objects) {
    return objects.every(function(o) {
        return !this.isCollideWithObjectFromLeft(o);
    }.bind(this));
};

Hero.prototype.isCollideWithObjectsFromBelow = function(objects) {
    return objects.every(function(o) {
        return !this.isCollideWithObjectFromBelow(o);
    }.bind(this));
};

Hero.prototype.isCollideWithObjectsFromAbove = function(objects) {
    return objects.every(function(o) {
        return !this.isCollideWithObjectFromAbove(o);
    }.bind(this));
};

Hero.prototype.canMoveUp = function(y, objects) {
    return this.canGoUpOf(y) && this.isCollideWithObjectsFromBelow(objects);
};

module.exports = Hero;