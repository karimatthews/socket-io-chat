
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  //Handle connection updates
  console.log('a user connected');
  socket.broadcast.emit('chat update','A user connected');

  //Handle disconnection updates
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('chat update', 'A user disconnected');
  });

  // Broadcast messages sent by other users
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socket.broadcast.emit('chat message', msg);
  });

  // Broadcast usernames of messages sent by other users
  socket.on('add username', function(msg){
    console.log('username: ' + msg);
    socket.broadcast.emit('add username', msg);
  });

});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000', process.env.PORT);
});
