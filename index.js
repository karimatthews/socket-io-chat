
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

function getRoom(socket) {
  var rooms = Object.keys(socket.rooms)
  return rooms[rooms.length - 1]
}

io.on('connection', function(socket){
  //Join client to room
  socket.on('join room', function(room) {
    console.log('a user joined room', room);
    socket.join(room)
  })

  //Handle connection updates
  console.log('a user connected');
  socket.broadcast.to(getRoom(socket)).emit('chat update','A user connected');

  //Handle disconnection updates
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.to(getRoom(socket)).emit('chat update', 'A user disconnected');
  });

  // Broadcast messages sent by other users
  // format: { text: 'msg text', username: 'Boris' }
  socket.on('chat message', function(msg){
    console.log('message: ', msg, getRoom(socket));
    socket.broadcast.to(getRoom(socket)).emit('chat message', msg);
  });

});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000', process.env.PORT);
});
