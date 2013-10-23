var defaults = require('../lib/defaults')();

//Processor is in charge of slicing up image and placing it in the target canvas.
var processor = require('./lib/processor')();
// var socketHandler = require('./lib/socketHandler')();

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

  var settingsInUrl = urlSettings();

  if(videoAdded && !documentReady){
    console.log("Calling it!2");
    processor.doLoad(); 
  }
  
  documentReady = true;
  urlSettings();
}

//If "selection" param is in query string,
//Set that to this projector's selection.
var urlSettings = function(){

  //The query vals:
  var w = window.location.href.split('?')[1].split('&');

  //For every query param (separated by &)
  for(var i = 0; i < w.length; i++){

    //If this is a settings URL val:
    var index = w[i].indexOf('selection=');

    if(index !== -1){
      var vals = w[i].slice(index+10, w[i].length);
      console.log("Parsed out these vals: ", vals);
      window.selection = JSON.parse(unescape(vals));
    }
  }
}

window.updateQueryString = function(){
  var baseUrlStart = window.location.href.indexOf('&selection');
  if(baseUrlStart!==-1){
                              //The first part of the url                 
    window.location.href = window.location.href.split('selection')[0] + 'selection=' + escape(JSON.stringify(window.selection));
  }else{
    window.location.href += '&selection=' + escape(JSON.stringify(window.selection));
  }
}