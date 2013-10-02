module.exports = function(defaults, socket){
  return new SelectionHandler(defaults, socket);
}

var SelectionHandler = function(defaults, socket){
  this.defaults = defaults;

  this.initializeDefaults = function(){

    window.width = $('video').width();
    window.height = $('video').height();

    var newSelections = [];

    this.defaults.selection.forEach(function(marquee){
      var a = marquee.source[0] / 640 * window.width;
      var b = marquee.source[1] / 480 * window.height;
      var c = marquee.source[2] / 640 * window.width;
      var d = marquee.source[3] / 480 * window.height;
      newSelections.push({source: [a,b,c,d], destination: marquee.destination});
    });

    window.selections = newSelections;
    //Share these selections with all clients.
    socket.emit('update', {performer:{selections:window.selections}});
  }

  this.updateAndEmitFrames = function(){

    //Updating logic would go here.  Say, if the marquees were manipulated.
    //For now this is really just a re-transmit function.

    socket.emit('update', {performer:{selections:window.selections}});

  }

  window.updateAndEmitFrames = this.updateAndEmitFrames;

}