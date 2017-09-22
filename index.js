
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
  var room

  //Join client to room
  //Handle connection updates
  socket.on('join room', function(msg) {
    room = msg
    console.log('a user joined room', room);
    socket.broadcast.to(room).emit('chat update','A user connected');
  })

  //Handle disconnection updates
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.to(room).emit('chat update', 'A user disconnected');
  });

  // Broadcast messages sent by other users
  // format: { text: 'msg text', username: 'Boris' }
  socket.on('chat message', function(msg){
    console.log('message: ', msg, room);
    socket.broadcast.to(room).emit('chat message', msg);
  });

});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000', process.env.PORT);
});
