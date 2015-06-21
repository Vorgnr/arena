(function(window, document, io) {

    var arenaCanvas = document.getElementById('arena');
    var uiCanvas = document.getElementById('ui');
    var player = document.getElementById('player');
    var context = arenaCanvas.getContext("2d");
    var uiContext = uiCanvas.getContext("2d");
    var playerContext = ui.getContext("2d");

    // window.addEventListener('resize', resizeCanvas, false);

    // function resizeCanvas() {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    // }
    // resizeCanvas();

    var Drawer = require('./drawer');
    var drawer = new Drawer(context, uiContext);
    var inputs = require('./inputs')();
    var Hero = require('./hero');
    
    var translateX = 0;
    var translateY = 0;
    var infoInitialPosition = { x: 32, y: 32};

    var update = function (keysDown, hero) {
        // Z - Up
        if (90 in keysDown && hero.canGoUpOf(0)) {
            translateY = hero.speed;
            hero.y -= hero.speed;
        // S - Down
        } else if (83 in keysDown && hero.canGoDownOf(map.height)) {
            translateY = -hero.speed;
            hero.y += hero.speed;
        }
        // Q - Left
        if (81 in keysDown && hero.canGoLeftOf(0)) {
            translateX = hero.speed;
            hero.x -= hero.speed;
        // D - Right
        } else if(68 in keysDown &&  hero.canGoRightOf(map.width)) {
            translateX = -hero.speed;
            hero.x += hero.speed;
        }

        //isHeroNearOutOfBound()
        // if (hero.x < 160 || hero.x > map.width - 160)
        //     translateX = 0;
        
        // if(hero.y < 160 || hero.y > map.height - 160)
        //     translateY = 0;
    };

    var heroReady = false;
    var heroImage = new Image();
    heroImage.onload = function () {
        heroReady = true;
    };
    heroImage.src = "images/hero.png";

    var bgReady = false;
    var bgImage = new Image();
    bgImage.onload = function () {
        bgReady = true;
    };
    bgImage.src = "images/bg.jpg";

    var hero = new Hero(arenaCanvas.width / 2, arenaCanvas.height / 2, heroImage);

    var map = {
        width: 1600,
        height: 800,
        rectangles : [
            { x: 160, y: 160, width: 160, height: 160 },
            { x: 160, y: 480, width: 160, height: 160 },
            { x: 720, y: 80, width: 160, height: 640 },
            { x: 1280, y: 160, width: 160, height: 160 },
            { x: 1280, y: 480, width: 160, height: 160 },
        ]
    };

    var then = Date.now();
    drawer.drawBackground(bgImage);
    var main = function() {
        var now = Date.now();
        var delta = now - then;
        var keysDown = inputs.getKeysDown();

        translateX = 0;
        translateY = 0;
        
        drawer.clear(hero.x, hero.y);
        update(keysDown, hero);
        
        drawer.translate(translateX, translateY);
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
        console.log(args)
    });


}(window, document, io))