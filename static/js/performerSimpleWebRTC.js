var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'video',
    // the id/element dom element that will hold remote videos
    // remoteVideosEl: 'remoteVideos',
    // immediately ask for camera access
    autoRequestMedia: true
});

// we have to wait until it's ready
webrtc.on('readyToCall', function () {
    // you can name it anything
    webrtc.joinRoom('Talking House');
});

var selections = [];
webrtc.on('videoAdded', updateAndEmitFrames);

function updateAndEmitFrames(){

	console.log("Video added.");
	var width = $('video').width();
	var height = $('video').height();
	var newSelections = [];

	marquees.forEach(function(marquee){
		var a = marquee[0] / 640 * width;
		var b = marquee[1] / 480 * height;
		var c = marquee[2] / 640 * width;
		var d = marquee[3] / 480 * height;
		newSelections.push({source:[a,b,c,d], destination:marquee.destination});
	});
	selections = newSelections;
	//Share these selections with all clients.
	console.log("Emitting update: ", {performer:{selections:selections}});
	socket.emit('update', {performer:{selections:selections}});

}