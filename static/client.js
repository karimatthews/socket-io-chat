
$(function () {
  var socket = io(); // magic library stuff
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val()); // key: 'chat message' value 'form input'
    $('#m').val(''); // clears the message input form
    return false; // don't do any form realted things that would normally happen
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});
