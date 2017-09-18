
// keep message scrolled to the bottom
function updateScroll(){
  var messages = document.getElementById("messages");
  messages.scrollTop = messages.scrollHeight;
  }


$(function () {
  var socket = io(); // magic library stuff

  //Handles messages sent by the user
  $('form').submit(function(){
    //If form input is empty don't print message
    if ($('#m').val() == "") {return false;}

    socket.emit('chat message', $('#m').val()); // key: 'chat message' value 'form input'
    $('#messages').append(
      $('<div>').addClass("message-container"
    ).append(   // append the message when the user presses enter
      $('<div>').text($('#m').val()).addClass("message right")
    ));

    updateScroll();

    $('#m').val(''); // clears the message input form

    return false; // don't do any form related things that would normally happen
  });

  //Handles messages sent by other users
  socket.on('chat message', function(msg){
    $('#messages').append(
      $('<div>').addClass("message-container"
    ).append( // adds the new message to the messages list
      $('<div>').text(msg).addClass("message")
    ));

    updateScroll();
  });

  //Handles updates
  socket.on('chat update', function(msg){
    $('#messages').append(
      $('<div>').addClass("message-container"
    ).append( // adds the new message to the messages list
      $('<div>').text(msg).addClass("update")
    ));

    updateScroll();
  });
});
