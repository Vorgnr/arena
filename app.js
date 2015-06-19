var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var users = [];

io.on('connection', function (socket) {
    users.push(socket.id);

    socket.emit('news', { users: users });

    socket.on('disconnect', function() {
        var index = users.indexOf(socket.id);
        if (index > -1) {
            users.splice(index, 1);
        }
    });
});


server.listen(8080);
