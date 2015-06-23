(function(window, document, io) {

    var arenaCanvas = document.getElementById('arena');
    var context = arenaCanvas.getContext("2d");
    var uiCanvas = document.getElementById('ui');
    var uiContext = uiCanvas.getContext("2d");

    var Drawer = require('./drawer');
    var inputs = require('./inputs')();
    var Hero = require('./hero');
    var Translation = require('./translation');
    var map = require('./maps').first;
    var Updater = require('./updater');
    
    var drawer = new Drawer(context, uiContext);
    var translation = new Translation();
    var hero = new Hero(arenaCanvas.width / 2, arenaCanvas.height / 2);
    var updater = new Updater(map, hero, translation);

    var main = function() {
        var keysDown = inputs.getKeysDown();

        translation.reset();
        drawer.clear(hero.x, hero.y);
        updater.update(keysDown, translation);
        
        drawer.translate(translation.x, translation.y);
        drawer.drawMapBorder(map.width, map.height);
        drawer.drawMapRectangle(map.rectangles);
        drawer.drawHero(hero);

        uiContext.font = "24px Helvetica";
        uiContext.textAlign = "left";
        uiContext.textBaseline = "top";
        uiContext.fillText(hero.x + " : " + hero.y, 0, 0);
    };

    var looper = require('./looper')(main);
    looper.start();

    var socket = io.connect('http://localhost:8080');
    socket.on('news', function(args) {
        console.log(args);
    });


}(window, document, window.io));