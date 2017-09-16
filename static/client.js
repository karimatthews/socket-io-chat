
$(function () {
  var socket = io(); // magic library stuff
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val()); // key: 'chat message' value 'form input'
    $('#messages').append(
      $('<div>').addClass("message-container"
    ).append(
      $('<div>').text($('#m').val()).addClass("message right")
    )); // append the message when the user presses enter
    $('#m').val(''); // clears the message input form
    return false; // don't do any form realted things that would normally happen
  });
  socket.on('chat message', function(msg){
    $('#messages').append(
      $('<div>').addClass("message-container"
    ).append(
      $('<div>').text(msg).addClass("message")
    )); // adds the new message to the messages list
  });
});
