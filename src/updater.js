'use strict';

var Hero = require('./hero')

function Updater(map, hero, camera) {
	this.map = map;
	this.hero = hero;
    this.camera = camera;
}

var handleHeroDirection = function(keysDown) {
    if ("Up" in keysDown) this.hero.turnUp();
    else if ("Down" in keysDown) this.hero.turnDown();
    
    if ("Left" in keysDown) this.hero.turnLeft();
    else if ("Right" in keysDown) this.hero.turnRight();
};

var handleHeroMovement = function(visibleObjects) {
    if (this.hero.canMove(0, 0, this.map.width, this.map.height, visibleObjects)) {
        this.hero.move();
        this.camera.follow(this.hero.vectorX, this.hero.vectorY);
        this.camera.move(this.hero.pixelPerS);
    }
};

Updater.prototype.update = function (keysDown, deltaTime) {
    var visibleObjects = this.camera.getVisiblesObjectsByCamera(this.map.rectangles);

    var previousHeroMouvementState = this.hero.movementState();
    this.hero.resetMovementState(deltaTime);
    
    handleHeroDirection.bind(this)(keysDown);
    handleHeroMovement.bind(this)(visibleObjects);
    
    //is Hero's state changed
    if(previousHeroMouvementState.toString() !== this.hero.movementState().toString())
        this.hero.isMovingStateChanged = true;
};

Updater.prototype.updateOthersHeroes = function (heroes) { 
    for (var i in heroes) {
        Hero.prototype.move.call(heroes[i]);
    }
};

module.exports = Updater;