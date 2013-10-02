module.exports = function(defaults){
  return new ImageProcessor(defaults);
}

var ImageProcessor = function(defaults){

  window.vidWidth = $('video').width();
  window.vidHeight = $('video').height();
  window.width = $(window).width();
  window.height = $(window).height();

  this.defaults = defaults;

  this.doLoad = function() {
    console.log("Procesor doLoad called");
    this.video = document.querySelector('#remoteVideos video');
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    this.c2 = document.getElementById("c2");
    this.ctx2 = this.c2.getContext("2d");

    var self = this;
    var neverPlayed = true;
    this.video.addEventListener("playing", function() {

      if(neverPlayed){
        neverPlayed = false;

        // console.log("Play event fired.");
          self.width = self.video.videoWidth / 2;
          self.height = self.video.videoHeight / 2;
          self.timerCallback();


      }

      $('video').bind('timeupdate', function(){
        self.computeFrame();
      })

    }, false);
  }

  this.timerCallback = function() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    var self = this;
    setTimeout(function () {
        self.timerCallback();
      }, 0);
  }

  this.computeFrame = function() {

    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    if(window.selection) sliceImageIntoImage(this.ctx1, this.ctx2, window.selection);

  }

}

/**
This is javascript that works for cropping/scaling from a canvas:

  var c1 = document.getElementById('c1');
  var c2 = document.getElementById('c2');

  var ctx1 = c1.getContext("2d");
  var ctx2 = c2.getContext("2d");

  ctx1.fillRect(25,25,100,100);
  ctx1.clearRect(45,45,60,60);
  ctx1.strokeRect(50,50,50,50);

  var img = new Image();
  img.id = "pic"
  img.src = this.c1.toDataURL();

  ctx2.drawImage(img, 25,25,50,50, 40, 40, 200, 200);


**/

function sliceImageIntoImage( srcCtx, destCtx ){

  var img = new Image();
  img.id = "pic"
  img.src = this.srcCtx.toDataURL();

  window.selection.forEach(function(s){

    //Each 's', or selection, is an object like this:
    // {
    //   source:[180, 175, 60, 45], //box to slice from, source implied
    //   destination:[0, 0, 1]  //ratioX, ratioY, ratioSize
    // }

    var dx = window.vidWidth * s.destination[0];
    var dy = window.vidHeight * s.destination[1];
    var dw = window.width * s.destination[2];
    var dh = window.height * s.destination[2];

    console.log("Drawing destination canvas");
    destCtx.drawImage(srcImg, s.source[0], s.source[1], s.source[2], s.source[3], dx, dy, dw, dh);  

      // for (var i = 0; i < l; i++) {
      //   var r = frame.data[i * 4 + 0];
      //   var g = frame.data[i * 4 + 1];
      //   var b = frame.data[i * 4 + 2];
      //   if (g > 100 && r > 100 && b < 43)
      //     frame.data[i * 4 + 3] = 0;
      // }
      // this.ctx2.putImageData(frame, 0, 0);

  });
}