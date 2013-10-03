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
window.readyFunction = function(){

  var addLinkFromUrl = require('./lib/urlGenerator')();

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

var socket = null;
//Socket.io setup:  (Disabled until live-updating is worked on)
// var socket = io.connect('http://localhost:8084');

// socket.on('settings', function (data) {
//   console.log("Settings received: ", data);
// });


//Handle program selections:

//Where we'll store data about the slices
var defaults = require('../lib/defaults')();
window.defaults = defaults;
var selectionHandler = require('./lib/selectionHandler')(defaults, socket);

},{"../lib/defaults":1,"./lib/marqueeHandler":3,"./lib/selectionHandler":4,"./lib/urlGenerator":5}],3:[function(require,module,exports){
module.exports = function(){
  console.log("Drawing marquees1");
  return new window.MarqueeHandler();
}

var $videoWell = $('#videoWell');
window.MarqueeHandler = function(){
  window.selection.forEach(function(m){

    /**Oh MarqueeTool, it would be so nice to be able to use you...**/
    // var newMarquee = new Marquee('videoWell', {color: '#F60', opacity: 0.45});
    // newMarquee.setCoords(m.source[0], m.source[1], m.source[2], m.source[3])

    var selection = '<div class="selection" style="';
    selection += 'left:'+m.source[0]+'px;top:'+m.source[1]+'px;width:'+m.source[2]+'px;height:'+m.source[3]+'px;"';
    selection += '></div>';

    // console.log("Drawing marquee: "+selection);
    // console.log($videoWell, $('#videoWell'));
    $('#videoWell').append(selection);
  })
}
},{}],4:[function(require,module,exports){
module.exports = function(defaults, socket){
  return new SelectionHandler(defaults, socket);
}

var SelectionHandler = function(defaults, socket){


  this.initializeDefaults = function(){

    window.width = $('video').width();
    window.height = $('video').height();

    //Share these selections with all clients.
    // socket.emit('update', {performer:{selections:window.selections}});
  }

  this.updateAndEmitFrames = function(){

    // socket.emit('update', {performer:{selections:window.selection}});

  }

  window.updateAndEmitFrames = this.updateAndEmitFrames;

}
},{}],5:[function(require,module,exports){
module.exports = function(){

  var url = document.URL.split('=');
  var projectorLink = '/projector'

  if(url.length > 1){
    projectorLink += '?id=' + url[url.length-1];

  }

  console.log("Adding in link: "+projectorLink);

  var link = $('a');
  link.attr('href', projectorLink);
  link.text(projectorLink);

}
},{}]},{},[2])
;