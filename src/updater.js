'use strict';

function Updater(map, hero, translation) {
	this.map = map;
	this.hero = hero;
    this.translation = translation;
}

Updater.prototype.update = function (keysDown) {
    // Z - Up
    if (90 in keysDown && this.hero.canGoUpOf(0)) {
        this.translation.y = this.hero.speed;
        this.hero.moveUp();
    // S - Down
    } else if (83 in keysDown && this.hero.canGoDownOf(this.map.height)) {
        this.translation.y = -this.hero.speed;
        this.hero.moveDown();
    }
    // Q - Left
    if (81 in keysDown && this.hero.canGoLeftOf(0)) {
        this.translation.x = this.hero.speed;
        this.hero.moveLeft();
    // D- Right
    } else if(68 in keysDown &&  this.hero.canGoRightOf(this.map.width)) {
        this.translation.x = -this.hero.speed;
        this.hero.moveRight();
    }
};

module.exports = Updater;