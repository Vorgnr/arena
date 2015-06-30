var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Hero = require('./server/model/hero');
var User = require('./server/model/user');

app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var users = {};

io.on('connection', function (socket) {
    users[socket.id] = new User();
    
    socket.on('updateHero', function(hero) {
        socket.broadcast.emit('updatedHero', { 
            id: socket.id,
            hero: hero 
        });
    });

    socket.on('disconnect', function() {
        delete users[socket.id];
    });
});


server.listen(8080);
