'use strict';

function Hero(x, y, image) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.image = image;
};

module.exports = Hero;