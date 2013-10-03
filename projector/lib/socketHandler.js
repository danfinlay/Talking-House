module.exports = function(){
  return new SocketHandler();
}

var SocketHandler = function(){

  window.socket = io.connect('http://localhost:8084');

  var settings = {};

  socket.on('settings', function (data) {
    console.log("Settings received: ", data);
    settings.performer = data.performer;
    if(data && data.performer && data.performer.selections && data.performer.selections.length > 0){
      window.selection = data.performer.selections;
    }
  });
}