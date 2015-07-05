'use strict';

function Client(socket) {
    this.socket = socket;
	this.initialize();
}

Client.prototype.initialize = function() {
	this.socket.on('updateHero', this.updateHero.bind(this));
};

Client.prototype.updateHero = function(hero) {
    this.socket.broadcast.emit('updatedHero', { 
        id: this.socket.id,
        hero: hero 
    });	
};

module.exports = Client;