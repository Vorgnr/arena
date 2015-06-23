(function(window, document, io) {

    var arenaCanvas = document.getElementById('arena');
    var context = arenaCanvas.getContext("2d");
    var uiCanvas = document.getElementById('ui');
    var uiContext = uiCanvas.getContext("2d");

    var Drawer = require('./drawer');
    var inputs = require('./inputs')();
    var Hero = require('./hero');
    var Camera = require('./camera');
    var map = require('./maps').first;
    var Updater = require('./updater');
    var looper = require('./looper')();
    
    var drawer = new Drawer(context, uiContext);
    var hero = new Hero(arenaCanvas.width / 2, arenaCanvas.height / 2);
    var camera = new Camera(0, 0, arenaCanvas.width, arenaCanvas.height);
    var updater = new Updater(map, hero, camera);

    var main = function() {
        var keysDown = inputs.getKeysDown();

        camera.init();
        drawer.clear(hero.x, hero.y);
        updater.update(keysDown, camera);
        
        drawer.translate(camera.translationX, camera.translationY);
        drawer.drawMapBorder(map.width, map.height);
        drawer.drawMapRectangle(map.rectangles);
        drawer.drawHero(hero);

        drawer.debug(hero.x + " : " + hero.y);
        drawer.debug(camera.x + " : " + camera.y);
        var visibleObject = updater.getMapObjectsVisibleByCamera();
        visibleObject.forEach(function(o) {
            drawer.debug(o.tag);
        });
    };

    looper.start(main);

    var socket = io.connect('http://localhost:8080');
    socket.on('news', function(args) {
        //console.log(args);
    });


}(window, document, window.io));