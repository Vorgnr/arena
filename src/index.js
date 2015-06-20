(function(window, document, io) {

    var canvas = document.getElementById('arena');
    var context = canvas.getContext("2d");

    var Drawer = require('./drawer');
    var drawer = new Drawer(context);
    var inputs = require('./inputHandler')();

    var looper = require('./looper')(function() {
        console.log(inputs.getKeysDown().isLeftClickDown);
    }, canvas);

    //looper.start();

    drawer.drawCircle(200, 200, 150);

    var socket = io.connect('http://localhost:8080');
    socket.on('news', function(args) {
        console.log(args)
    });


}(window, document, io))