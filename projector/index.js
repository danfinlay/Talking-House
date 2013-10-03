var defaults = require('../lib/defaults')();

//Processor is in charge of slicing up image and placing it in the target canvas.
var processor = require('./lib/processor')();
var socketHandler = require('./lib/socketHandler')();

//WebRTC Setup:
var webrtc = new SimpleWebRTC({
    remoteVideosEl: 'remoteVideos',
    autoRequestMedia: true
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
    webrtc.joinRoom('Talking House');
});

//Processor's doLoad is called once both webRTC & document are ready:
var videoAdded = false;
var documentReady = false;

webrtc.on('videoAdded', function(){
  console.log("Video added.");
  if(documentReady && !videoAdded){
    console.log("Calling it!");
    processor.doLoad();
  }
  videoAdded = true;
})

window.readyFunction = function(){
  console.log("Readyfunction called");
  if(videoAdded && !documentReady){
    console.log("Calling it!2");
    processor.doLoad(); 
  }
  
  documentReady = true;
}