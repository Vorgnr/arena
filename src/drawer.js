'use strict';

function Drawer(arenaContext, uiContext) {
    this.arenaContext = arenaContext;
    this.uiContext = uiContext;
    
    this.resetDebugBuffer();
    this.debugFontSize = 12;
    this.uiContext.font = this.debugFontSize.toString() + "px Helvetica";
    this.uiContext.textAlign = "left";
    this.uiContext.textBaseline = "top";
};

Drawer.prototype.debug = function(s) {
    this.uiContext.fillText(s, 0, this.debugBufferPosition);
    this.debugBufferPosition += this.debugFontSize;
};

Drawer.prototype.resetDebugBuffer = function() {
    this.debugBufferPosition = 0;
};

Drawer.prototype.drawCircle = function(x, y, rayon) {
    this.arenaContext.beginPath();
    this.arenaContext.arc(x, y, rayon, 0, Math.PI * 2);
    this.arenaContext.fill();
    this.arenaContext.closePath();
    this.arenaContext.stroke();
};

Drawer.prototype.drawBackground = function(background) {
    this.arenaContext.drawImage(background, 0, 0);
};

Drawer.prototype.drawHero = function(hero) {
    this.arenaContext.drawImage(hero.image, hero.x, hero.y);
};

Drawer.prototype.drawPlots = function(plots) {
    for (var i = 0; i < plots.length; i++){
        this.arenaContext.beginPath();
        this.arenaContext.arc(plots[i].x, plots[i].y, 5, 0, 2 * Math.PI);
        this.arenaContext.fill();
    }
};

Drawer.prototype.drawMapBorder = function(width, height) {
    this.arenaContext.strokeRect(0, 0, width, height);
};

Drawer.prototype.drawMapRectangle = function(rectangles) {
    for (var i = 0; i < rectangles.length; i++) {
        this.arenaContext.strokeRect(rectangles[i].x, rectangles[i].y, rectangles[i].width, rectangles[i].height);
    }
};

Drawer.prototype.translate = function(x, y) {
    this.arenaContext.translate(x, y);
};

Drawer.prototype.clear = function(heroX, heroY) {
    var x = heroX - this.arenaContext.canvas.width / 2;
    var y = heroY - this.arenaContext.canvas.height / 2;
    this.arenaContext.clearRect(x, y, this.arenaContext.canvas.width, this.arenaContext.canvas.height);
    this.uiContext.clearRect(0, 0, 200, 100);
};

module.exports = Drawer;