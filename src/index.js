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
        //isHeroOutOfBound()
        if (hero.x < 0) {
            hero.x = 1;
            return;
        } else if (hero.y < 0) {
            hero.y = 1
            return;
        }

        // Z - Up
        if (90 in keysDown) {
            translateY = hero.speed;
            hero.y -= hero.speed;
        // S - Down
        } else if (83 in keysDown) {
            translateY = -hero.speed;
            hero.y += hero.speed;
        }
        // Q - Left
        if (81 in keysDown) {
            translateX = hero.speed;
            hero.x -= hero.speed;
        // D - Right
        } else if(68 in keysDown) {
            translateX = -hero.speed;
            hero.x += hero.speed;
        }

        //isHeroNearOutOfBound()
        if (hero.x < 150)
            translateX = 0;
        
        if(hero.y < 150)
            translateY = 0;
    };

    var heroReady = false;
    var heroImage = new Image();
    heroImage.onload = function () {
        heroReady = true;
    };
    heroImage.src = "images/hero.png";
    heroImage.size = 32;

    var bgReady = false;
    var bgImage = new Image();
    bgImage.onload = function () {
        bgReady = true;
    };
    bgImage.src = "images/bg.jpg";

    var hero = new Hero(arenaCanvas.width / 2, arenaCanvas.height / 2, heroImage);

    var plot = [
      {x:50, y:100},
      {x:200, y:200},
      {x:400, y:300},
      {x:500, y:190},
      {x:600, y:25},
      {x:700, y:433},
      {x:800, y:900},
      {x:433, y:854},
      {x:255, y:633},
      {x:675, y:848},
      {x:500, y:233}
    ];

    var then = Date.now();
    drawer.drawBackground(bgImage);
    var main = function() {
        var now = Date.now();
        var delta = now - then;

        var keysDown = inputs.getKeysDown();

        translateX = 0;
        translateY = 0;
        update(keysDown, hero);
        
        drawer.clear(hero.x, hero.y);
        drawer.translate(translateX, translateY);
        drawer.drawHero(hero);
        drawer.drawPlots(plot);

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