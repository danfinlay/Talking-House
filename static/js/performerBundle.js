;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(){
  
  window.selections = [];

  return {
    selection: [
      {
        source:[180, 175, 60, 45],
        destination:[0, 0, 1]
      },
      {
        source:[250, 175, 60, 45],
        destination:[0.4, 0, 1]
      },
      {
        source:[210, 210, 75, 100],
        destination:[0.6, 0, 1]
      }
    ]
  }

}
},{}],2:[function(require,module,exports){
//Socket.io setup:
var socket = io.connect('http://localhost:8084');

socket.on('settings', function (data) {
  console.log("Settings received: ", data);
});


//Handle program selections:

//Where we'll store data about the slices
var defaults = require('../lib/defaults')();
var selectionHandler = require('./lib/selectionHandler')(defaults, socket);




// WebRTC Setup:
var webrtc = new SimpleWebRTC({
    localVideoEl: 'video',
    autoRequestMedia: true
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
    webrtc.joinRoom('Talking House');
    //I guess we'll use a timer for now:
    setTimer(selectionHandler.updateAndEmitFrames, 5000);
});

//Right now this event is never getting fired,
//even though it's totally the event we'd want.
//(SimpleWebRTC is super-beta).
//That's why we're using the setTimer instead for now.
webrtc.on('videoAdded', selectionHandler.updateAndEmitFrames);
},{"../lib/defaults":1,"./lib/selectionHandler":3}],3:[function(require,module,exports){
module.exports = function(defaults, socket){
  return new SelectionHandler(defaults, socket);
}

var SelectionHandler = function(defaults, socket){
  this.defaults = defaults;

  this.initializeDefaults = function(){

    window.width = $('video').width();
    window.height = $('video').height();

    var newSelections = [];

    this.defaults.selection.forEach(function(marquee){
      var a = marquee.source[0] / 640 * window.width;
      var b = marquee.source[1] / 480 * window.height;
      var c = marquee.source[2] / 640 * window.width;
      var d = marquee.source[3] / 480 * window.height;
      newSelections.push({source: [a,b,c,d], destination: marquee.destination});
    });

    window.selections = newSelections;
    //Share these selections with all clients.
    socket.emit('update', {performer:{selections:window.selections}});
  }

  this.updateAndEmitFrames = function(){

    //Updating logic would go here.  Say, if the marquees were manipulated.
    //For now this is really just a re-transmit function.

    socket.emit('update', {performer:{selections:window.selections}});

  }

  window.updateAndEmitFrames = this.updateAndEmitFrames;

}
},{}]},{},[2])
;