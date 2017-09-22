
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){

  //Identify and join room
  var roomId = socket.client.request.headers.referer
  socket.join(roomId)

  //Handle connection updates
  console.log('a user connected');
  socket.broadcast.to(roomId).emit('chat update','A user connected');

  //Handle disconnection updates
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.to(roomId).emit('chat update', 'A user disconnected');
  });

  // Broadcast messages sent by other users
  // format: { text: 'msg text', username: 'Boris' }
  socket.on('chat message', function(msg){
    console.log('message: ', msg);
    socket.broadcast.to(roomId).emit('chat message', msg);
  });

});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000', process.env.PORT);
});
