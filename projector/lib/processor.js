module.exports = function(defaults){
  return new ImageProcessor(defaults);
}

var ImageProcessor = function(defaults){

  // This closure allows easy use of requestAnimationFrame()
  // As described in this blog post:
  // http://creativejs.com/resources/requestanimationframe/
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
  }());

  window.width = $(window).width();
  window.height = $(window).height();

  setTimeout(updateViewSize, 2000);

  this.defaults = defaults;

  var self = this;



  this.computeFrame = function(delta) {
    window.requestAnimationFrame(self.computeFrame);
    // console.log("Computing frame.");
    // window.ctx1.drawImage(window.video, 0, 0, window.source.width, window.source.height);
    if(window.selection) self.sliceImageIntoImage(window.ctx1, window.ctx2, window.selection);
  }

  this.doLoad = function() {
    console.log("Procesor doLoad called");
    window.video = document.querySelector('#remoteVideos video');
    // window.c1 = document.getElementById("c1");
    // window.ctx1 = window.c1.getContext("2d");
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
      // $('video').bind('timeupdate', function(){
      //   // console.log("Time update");
        self.computeFrame();
      // });

    }, false);
  }

  this.sliceImageIntoImage = function( srcCtx, destCtx ){

    // this.img = new Image();
    // this.img.id = "pic";
    // this.img.src = window.c1.toDataURL();

    var that = this;

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
     
      destCtx.drawImage(window.video, s.source[0], s.source[1], s.source[2], s.source[3], dx, dy, dw, dh);  



    });
  }
  this.updateViewSize = updateViewSize;
  this.img;

}



function updateViewSize(){
  $('#c2').attr('width', window.width);
  window.vidWidth = window.width;
  $('#c2').attr('height', window.height);
  window.vidHeight = window.height;

  window.sizeDifference = window.vidWidth / 640;
  console.log("Size diff: "+sizeDifference);
}

