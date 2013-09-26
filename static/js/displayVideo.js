//Making sure the browser supports webRTC:
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia || navigator.msGetUserMedia || null;

// console.log("Has get user media?: "+navigator.getUserMedia);

var firstFrame = true;
var mediaFrame = null;

navigator.getUserMedia({
  video:true,
  audio:false
}, function(localMediaStream){

  if(firstFrame){
    firstFrame = false;
    console.log(localMediaStream);
    mediaFrame = localMediaStream;
  }

  var video = document.querySelector('video');
  video.src = window.URL.createObjectURL(localMediaStream);

  // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
  // See crbug.com/110938.
  video.onloadedmetadata = function(e) {
    // Ready to go. Do some stuff.
  };

}, function(e){
  //On failure
  console.log("Video failure: ", e);
});