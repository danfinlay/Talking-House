var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    // localVideoEl: 'video',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remoteVideos',
    // immediately ask for camera access
    autoRequestMedia: true
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
    // you can name it anything
    webrtc.joinRoom('Talking House');
});

var videoAdded = false;
webrtc.on('videoAdded', function(){
	console.log("Video added.");
	if(documentReady && !videoAdded){
		console.log("Calling it!");
		processor.doLoad();
	}
	videoAdded = true;
})



var processor = {
	doLoad: function() {
		console.log("Doload called>");
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

	      }, false);
	},
  timerCallback: function() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    var self = this;
    setTimeout(function () {
        self.timerCallback();
      }, 0);
  },
  computeFrame: function() {

    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    // var frame = this.ctx1.getImageData(0, 0, this.width, this.height);
    // var l = frame.data.length / 4;
	var img = new Image();
	img.id = "pic"
	img.src = this.c1.toDataURL();
	// document.getElementById('image_for_crop').appendChild(img);
    if(selections) sliceImageIntoImage(img, this.ctx2, selections);

    return;
  }
};

var frameComputed = false;

var documentReady = false;
function readyFunction(){
	console.log("Readyfunction called");
	if(videoAdded && !documentReady){
		console.log("Calling it!2");
		processor.doLoad();	
	}
	
	documentReady = true;
}