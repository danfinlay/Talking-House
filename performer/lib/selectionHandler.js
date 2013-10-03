module.exports = function(defaults, socket){
  return new SelectionHandler(defaults, socket);
}

var SelectionHandler = function(defaults, socket){


  this.initializeDefaults = function(){

    window.width = $('video').width();
    window.height = $('video').height();

    //Share these selections with all clients.
    // socket.emit('update', {performer:{selections:window.selections}});
  }

  this.updateAndEmitFrames = function(){

    // socket.emit('update', {performer:{selections:window.selection}});

  }

  window.updateAndEmitFrames = this.updateAndEmitFrames;

}