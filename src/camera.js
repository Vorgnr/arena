
function Camera(x, y, width, height) {
	this.init();
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
};

Camera.prototype.init = function() {
	this.translationX = 0;
	this.translationY = 0;
};

Camera.prototype.isObjectVisibleByCamera = function(o) {
	if (o.x + o.width < this.x || o.x > this.x + this.width) return false;
	if (o.y + o.height < this.y || o.y > this.y + this.height) return false;
	return true;
};

Camera.prototype.moveUp = function(speed) {
	this.translationY = speed;
	this.y -= speed;
};

Camera.prototype.moveDown = function(speed) {
	this.translationY = -speed;
	this.y += speed;
};

Camera.prototype.moveLeft = function(speed) {
	this.translationX = speed;
	this.x -= speed;
};

Camera.prototype.moveRight = function(speed) {
	this.translationX = -speed;
	this.x += speed;
};

module.exports = Camera;
