var currentWindow = {
	width: $(window).width(),
	height: $(window).height()
}

var localSelections = [];
var firstRun = true;

function sliceImageIntoImage( srcImg, destCtx ){
	if(firstRun){
		firstRun = false;
		selections.forEach(function(s){
			s.source.push(currentWindow.width * s.destination[0])
			s.source.push(currentWindow.height * s.destination[1]);
			s.source.push(s.source[2] * s.destination[2]);
			s.source.push(s.source[3] * s.destination[3]);
		});
	}
	selections.forEach(function(s){

		destCtx.drawImage(srcImg, s.source[0], s.source[1], s.source[2], s.source[3], s.source[4], s.source[5], s.source[6], s.source[7]);  

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

