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
    return this.x - this.pixelPerS >= x;
};

Hero.prototype.canGoUpOf = function(y) {
    return this.y - this.pixelPerS >= y;
};

Hero.prototype.canGoRightOf = function(x) {
    return this.x + this.size + this.pixelPerS < x;
};

Hero.prototype.canGoDownOf = function(y) {
    return this.y + this.size + this.pixelPerS < y;
};

Hero.prototype.move = function() {
    this.x += this.pixelPerS * this.vectorX;
    this.y += this.pixelPerS * this.vectorY;
};

Hero.prototype.turnUp = function() {
    this.vectorY = -1;
};

Hero.prototype.turnLeft = function() {
    this.vectorX = -1;
};

Hero.prototype.turnRight = function() {
    this.vectorX = 1;
};

Hero.prototype.turnDown = function() {
    this.vectorY = 1;
};

Hero.prototype.resetMovementState = function(deltaTime) {
    this.deltaTime = deltaTime;
    this.pixelPerS = Math.round(this.speed * this.deltaTime);
    this.vectorX = 0;
    this.vectorY = 0;
    this.isMovingStateChanged = false;
};

Hero.prototype.movementState = function() {
    return [this.vectorX, this.vectorY];
};

Hero.prototype.isCollideWithObjectFromAbove = function(o) {
    return o.y <= this.y + this.pixelPerS + this.size 
        && this.y + this.pixelPerS <= o.y + o.height
        && o.x < this.x + this.size && this.x < o.x + o.width;
};

Hero.prototype.isCollideWithObjectFromBelow = function(o) {
    return o.y + o.height > this.y - this.pixelPerS
        && this.y + this.size > o.y
        && o.x < this.x + this.size && this.x < o.x + o.width;
};

Hero.prototype.isCollideWithObjectFromRight = function(o) {
    return o.x + o.width > this.x - this.pixelPerS &&
        this.x - this.pixelPerS > o.x &&
        o.y < this.y + this.size &&
        this.y < o.y + o.height;
};

Hero.prototype.isCollideWithObjectFromLeft = function(o) {
    return o.x < this.x + this.pixelPerS + this.size &&
        this.x + this.pixelPerS < o.x + o.width &&
        o.y < this.y + this.size && this.y < o.y + o.height;
};

Hero.prototype.isCollideWithObjects = function(objects, filter) {
    return objects.every(function(o) {
        return !filter.bind(this)(o);
    }.bind(this));
};

Hero.prototype.canMove = function(x, y, w, h, objects) {
    var canMoveUpOrDown = false;
    if (this.vectorY === -1)
        canMoveUpOrDown = this.canMoveUp(y, objects);
    else if (this.vectorY === 1)
        canMoveUpOrDown = this.canMoveDown(h, objects);
        
    var canMoveLeftOrRight = false;
    if (this.vectorX === -1)
        canMoveLeftOrRight = this.canMoveLeft(x, objects);
    else if (this.vectorX === 1)
        canMoveLeftOrRight = this.canMoveRight(w, objects);
        
    if (!canMoveUpOrDown) this.vectorY = 0;
    if (!canMoveLeftOrRight) this.vectorX = 0;
        
    return canMoveUpOrDown || canMoveLeftOrRight;
};

Hero.prototype.canMoveUp = function(y, objects) {
    return this.canGoUpOf(y) && this.isCollideWithObjects(objects, this.isCollideWithObjectFromBelow);
};

Hero.prototype.canMoveDown = function(y, objects) {
    return this.canGoDownOf(y) && this.isCollideWithObjects(objects, this.isCollideWithObjectFromAbove);
};

Hero.prototype.canMoveLeft = function(x, objects) {
    return this.canGoLeftOf(x) && this.isCollideWithObjects(objects, this.isCollideWithObjectFromRight);
};

Hero.prototype.canMoveRight= function(x, objects) {
    return this.canGoRightOf(x) && this.isCollideWithObjects(objects, this.isCollideWithObjectFromLeft);
};

module.exports = Hero;