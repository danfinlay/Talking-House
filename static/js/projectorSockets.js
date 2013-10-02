var socket = io.connect('http://localhost:8084');

var settings = {performer:{
	selections:marquees
}};

var selections = [];

socket.on('settings', function (data) {
	console.log("Settings received: ", data);
	settings.performer = data.performer;
	if(data && data.performer && data.performer.selections){
		selections = data.performer.selections;
	}
});