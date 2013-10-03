module.exports = function(){
  
  var defaults = {
    selection: [
      //Left eye:
      {
        source:[230, 175, 60, 45],
        destination:[0, 0.1, 3]
      },
      //The mouth door:
      {
        source:[260, 210, 75, 100],
        destination:[0.32, 0.0, 3.5]
      },
      //Right Eye:
      {
        source:[300, 175, 60, 45],
        destination:[0.75, 0.1, 3]
      }
    ],
    source:{
      width: 640,
      height: 480
    }
  };

  window.selection = defaults.selection;
  window.source = defaults.source;

  return defaults;

}