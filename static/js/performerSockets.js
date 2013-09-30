var mySignal = null;

var socket = io.connect('http://localhost:8084');
socket.on('signals', function (data) {
	console.log("Signals received: ",data);
});


//What the server is looking for:
// io.sockets.on('connection', function (socket) {

//   socket.emit('signals', currentSignals);
//   socket.on('new client', function (data) {
//     if(data.performer){
//     	currentSignals.data = data.performer;
//     }
//     if(data.audience){
//     	currentSignals.audience.push(data.audience);
//     }
//     io.sockets.emit('signals', currentSignals);
//   });
// });