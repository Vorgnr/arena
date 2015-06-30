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

Updater.prototype.update = function (keysDown, deltaTime) {
    var visibleObjects = this.getMapObjectsVisibleByCamera();

    var previousHeroMouvementState = this.hero.movementState();
    this.hero.resetMovementState();
    
    // Z - Up
    if (90 in keysDown && this.hero.canGoUpOf(0) && this.hero.isCollideWithObjectsFromBelow(visibleObjects)) {
        this.hero.moveUp(deltaTime);
        this.camera.moveUp(this.hero.speed * deltaTime);
    // S - Down
    } else if (83 in keysDown && this.hero.canGoDownOf(this.map.height) && this.hero.isCollideWithObjectsFromAbove(visibleObjects)) {
        this.hero.moveDown(deltaTime);
        this.camera.moveDown(this.hero.speed * deltaTime);
    }
    // Q - Left
    if (81 in keysDown && this.hero.canGoLeftOf(0) && this.hero.isCollideWithObjectsFromRight(visibleObjects)) {
        this.hero.moveLeft(deltaTime);
        this.camera.moveLeft(this.hero.speed * deltaTime);
    // D- Right
    } else if(68 in keysDown &&  this.hero.canGoRightOf(this.map.width) && this.hero.isCollideWithObjectsFromLeft(visibleObjects)) {
        this.hero.moveRight(deltaTime);
        this.camera.moveRight(this.hero.speed * deltaTime);
    }
    
    //is Hero's state changed
    if(previousHeroMouvementState.toString() !== this.hero.movementState().toString())
        this.hero.isMovingStateChanged = true;
};

Updater.prototype.updateOtherHeroes = function (heroes) { 
    for (var i in heroes) {
        if (heroes[i].isMovingUp) {
            heroes[i].y -= heroes[i].speed;
        } else if (heroes[i].isMovingDown) {
            heroes[i].y += heroes[i].speed;
        }
         
         if (heroes[i].isMovingLeft) {
            heroes[i].x -= heroes[i].speed;
         } else if (heroes[i].isMovingRight) {
            heroes[i].x += heroes[i].speed;
         }
    }
};

module.exports = Updater;