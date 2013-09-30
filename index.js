var http = require('http');
var ecstatic = require('ecstatic');
var url = require('url');
var fs = require('fs');

var port = process.argv[2] || 8084; //Default port is 8084, if no argument is given.
var socketPort = 8086;

var server = http.createServer(function(req, res){

	var parsedReq = url.parse(req.url,true);
	var path = parsedReq.pathname.split('/');

	if (path[1] === 'performer') {
		res.writeHead(200);
		fs.createReadStream(__dirname + '/static/performer.html').pipe(res);
	} else if (path[1] === 'projector') {
		res.writeHead(200);
		fs.createReadStream(__dirname + '/static/projector.html').pipe(res);
	} else {
		ecstatic({root: __dirname+'/static', handleError:false})(req, res);
	}

}).listen(port);


//Signaling data exchange via WebSockets:
var io = require('socket.io').listen(socketPort);

var currentSignals = {
	performer: null,
	audience: []
}

io.sockets.on('connection', function (socket) {
  socket.emit('signals', currentSignals);
  socket.on('new client', function (data) {
    if(data.performer){
    	currentSignals.data = data.performer;
    }
    if(data.audience){
    	currentSignals.audience.push(data.audience);
    }
    io.sockets.emit('signals', currentSignals);
  });
});