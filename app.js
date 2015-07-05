var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Hero = require('./server/model/hero');
var Client = require('./server/client')

app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var clients = {};

io.on('connection', function (socket) {
    clients[socket.id] = new Client(socket);
    
    socket.on('disconnect', function() {
        delete clients[socket.id];
    });
});

server.listen(8080);
