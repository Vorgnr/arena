
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
	this.vectorX = 0;
	this.vectorY = 0;
};

Camera.prototype.isObjectVisibleByCamera = function(o) {
	if (o.x + o.width < this.x || o.x > this.x + this.width) return false;
	if (o.y + o.height < this.y || o.y > this.y + this.height) return false;
	return true;
};

Camera.prototype.follow = function(vectorX, vectorY) {
	this.vectorX = vectorX;
	this.vectorY = vectorY;
};

Camera.prototype.move = function(speed) {
	this.translationX = - this.vectorX * speed;
	this.translationY = - this.vectorY * speed;
	this.x += speed * this.vectorX;
	this.y += speed * this.vectorY;
};

Camera.prototype.getVisiblesObjectsByCamera = function(objects) {
    return objects.filter(function(r) {
        return this.isObjectVisibleByCamera(r);
    }.bind(this));
};

module.exports = Camera;
