;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(){
  
  var defaults = {
    selection: [
      //Left eye:
      {
        source:[230, 175, 60, 45],
        destination:[0, 0.1, 3]
      },
      //The mouth door:
      {
        source:[260, 210, 75, 100],
        destination:[0.32, 0.0, 3.5]
      },
      //Right Eye:
      {
        source:[300, 175, 60, 45],
        destination:[0.75, 0.1, 3]
      }
    ],
    source:{
      width: 640,
      height: 480
    }
  };

  window.selection = defaults.selection;
  window.source = defaults.source;

  return defaults;

}
},{}],2:[function(require,module,exports){
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
},{"../lib/defaults":1,"./lib/processor":3,"./lib/socketHandler":4}],3:[function(require,module,exports){
module.exports = function(defaults){
  return new ImageProcessor(defaults);
}

var ImageProcessor = function(defaults){

  window.width = $(window).width();
  window.height = $(window).height();

  setTimeout(updateViewSize, 2000);

  this.defaults = defaults;

  var self = this;

  this.doLoad = function() {
    console.log("Procesor doLoad called");
    window.video = document.querySelector('#remoteVideos video');
    window.c1 = document.getElementById("c1");
    window.ctx1 = window.c1.getContext("2d");
    window.c2 = document.getElementById("c2");
    window.ctx2 = window.c2.getContext("2d");

    var neverPlayed = true;
    window.video.addEventListener("playing", function() {

      if(neverPlayed){
        neverPlayed = false;

        // console.log("Play event fired.");
        self.width = window.video.videoWidth / 2;
        self.height = window.video.videoHeight / 2;
        // self.timerCallback();
      }

      //This is the callback that we're rendering on.
      //Either it's not every frame, or slicing video is very CPU intensive.
      $('video').bind('timeupdate', function(){
        // console.log("Time update");
        self.computeFrame();
      });

    }, false);
  }

  this.computeFrame = function() {

    // console.log("Computing frame.");
    window.ctx1.drawImage(window.video, 0, 0, window.source.width, window.source.height);
    if(window.selection) this.sliceImageIntoImage(window.ctx1, window.ctx2, window.selection);

  }
  this.sliceImageIntoImage = sliceImageIntoImage;
  this.updateViewSize = updateViewSize;
  this.img;

}

function sliceImageIntoImage( srcCtx, destCtx ){

  this.img = new Image();
  this.img.id = "pic";
  this.img.src = window.c1.toDataURL();

  window.selection.forEach(function(s){

    //Each 's', or selection, is an object like this:
    // {
    //   source:[180, 175, 60, 45], //box to slice from, source implied
    //   destination:[0, 0, 1]  //ratioX, ratioY, ratioSize
    // }

    var dx = window.vidWidth * s.destination[0];
    var dy = window.vidHeight * s.destination[1];
    var dw = s.source[2] * s.destination[2] * window.sizeDifference;
    var dh = s.source[3] * s.destination[2] * window.sizeDifference;

    // console.log("Working with: ", window.vidWidth, window.vidHeight, s)
    // console.log("Drawing destination canvas", [s.source[0], s.source[1], s.source[2], s.source[3], dx, dy, dw, dh]);
   
    destCtx.drawImage(this.img, s.source[0]+50, s.source[1], s.source[2], s.source[3], dx, dy, dw, dh);  



  });
}

function updateViewSize(){
  $('#c2').attr('width', window.width);
  window.vidWidth = window.width;
  $('#c2').attr('height', window.height);
  window.vidHeight = window.height;

  window.sizeDifference = window.vidWidth / 640;
  console.log("Size diff: "+sizeDifference);
}
},{}],4:[function(require,module,exports){
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
},{}]},{},[2])
;