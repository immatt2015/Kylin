var app = require('express')(),
    server =  require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(8888);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello:'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});


console.log("Server running at http://localhost:8888/");


