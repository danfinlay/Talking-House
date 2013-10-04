module.exports = function(){
  
  var defaults = {
    selection: [
      //Left eye:
      {
        source:[200, 125, 120, 90],
        destination:[0, 0.3, 1.5]
      },
      //The mouth door:
      {
        source:[275, 260, 100, 130],
        destination:[0.3, 0.25, 2]
      },
      //Right Eye:
      {
        source:[330, 125, 120, 90],
        destination:[0.65, 0.3, 1.5]
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