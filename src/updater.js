'use strict';

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
    //TODO handle collisions
    if (this.hero.vectorX || this.hero.vectorY) {
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