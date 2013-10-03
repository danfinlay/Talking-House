var http = require('http');
var ecstatic = require('ecstatic');
var url = require('url');
var fs = require('fs');

//Local modules:
var makeId = require('./lib/makeId');

var port = process.env.PORT || 8084; //Default port is 8084, if no argument is given.
var socketPort = 8086;

var server = http.createServer(function(req, res){

	var parsedReq = url.parse(req.url,true);
	var path = parsedReq.pathname.split('/');
	console.log("Path requested: "+JSON.stringify(path));
	if(path[1] === 'new'  && ((path.length === 3 && path[2] === '') || path.length===2)){
		console.log("Hit the first one.");
		res.writeHead(302, {
			'Location':'/performer/?id='+makeId(6),
			'Content-Type': 'text/html',
		});
		res.end('To create a unique stream, go to this site /projector/ANY_ID_YOU_WANT_TRY_TO_BE_UNIQUE');
	} else if (path[1] === 'performer' && ((path.length === 3 && path[2] === '') || path.length===2) ) {
		console.log("Performer caught");
		res.writeHead(200);
		fs.createReadStream(__dirname + '/static/performer.html').pipe(res);
	} else if (path[1] === 'projector' && ((path.length === 3 && path[2] === '') || path.length===2)) {
		console.log("Projector caught");
		res.writeHead(200);
		fs.createReadStream(__dirname + '/static/projector.html').pipe(res);
	} else {

		console.log("Ecstatic caught");
		ecstatic({root: __dirname+'/static', handleError:false})(req, res);
	}

}).listen(port);


var currentSettings = {
	performer: null,
	audience: []
}


//Disabling sockets for now, no real-time refining of display from performer view.

// var io = require('socket.io').listen(server);

// io.sockets.on('connection', function (socket) {
	// console.log("New connection");

	// socket.emit('signals', currentSettings);
	// socket.on('update', function (data) {
	// 	console.log("update: "+JSON.stringify(data));
	// 	if(data.performer){
	// 		currentSettings.performer = data.performer;
	// 	}
	// 	if(data.audience){
	// 		currentSettings.audience.push(data.audience);
	// 	}
	// 	console.log("Emitting signals: "+currentSettings);
	// 	io.sockets.emit('settings', currentSettings);
	// });

// });