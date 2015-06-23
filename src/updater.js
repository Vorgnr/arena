'use strict';

function Updater(map, hero, camera) {
	this.map = map;
	this.hero = hero;
    this.camera = camera;
}

Updater.prototype.getMapObjectsVisibleByCamera = function() {
    return this.map.rectangles.filter(function(r) {
        return this.camera.isObjectVisibleByCamera(r);
    }.bind(this));
};

Updater.prototype.update = function (keysDown) {
    // Z - Up
    if (90 in keysDown && this.hero.canGoUpOf(0)) {
        this.hero.moveUp();
        this.camera.moveUp(this.hero.speed);
    // S - Down
    } else if (83 in keysDown && this.hero.canGoDownOf(this.map.height)) {
        this.hero.moveDown();
        this.camera.moveDown(this.hero.speed);
    }
    // Q - Left
    if (81 in keysDown && this.hero.canGoLeftOf(0)) {
        this.hero.moveLeft();
        this.camera.moveLeft(this.hero.speed);
    // D- Right
    } else if(68 in keysDown &&  this.hero.canGoRightOf(this.map.width)) {
        this.hero.moveRight();
        this.camera.moveRight(this.hero.speed);
    }
};

module.exports = Updater;