
window.readyFunction = function(){
  // WebRTC Setup:
  var webrtc = new SimpleWebRTC({
      localVideoEl: 'video',
      autoRequestMedia: true
  });

  // we have to wait until it's ready
  webrtc.on('readyToCall', function () {
      webrtc.joinRoom('Talking House');
      //I guess we'll use a timer for now:
      setInterval(selectionHandler.updateAndEmitFrames, 5000);
  });

  //Right now this event is never getting fired,
  //even though it's totally the event we'd want.
  //(SimpleWebRTC is super-beta).
  //That's why we're using the setTimer instead for now.
  webrtc.on('videoAdded', selectionHandler.updateAndEmitFrames);
  var marqueeHandler = require('./lib/marqueeHandler')();

}

//Socket.io setup:
var socket = io.connect('http://localhost:8084');

socket.on('settings', function (data) {
  console.log("Settings received: ", data);
});


//Handle program selections:

//Where we'll store data about the slices
var defaults = require('../lib/defaults')();
window.defaults = defaults;
var selectionHandler = require('./lib/selectionHandler')(defaults, socket);

