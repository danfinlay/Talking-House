//This static file allows for a default set of selected regions
//to be sent over rather than any dynamic ones.
//Dynamic would be better for a product, but this is simpler
//For my own project.

function readyFunction(){
  //Initial configuration:
  var $body = $('body');
  var $videoWell = $('#videoWell');

  //Preset marquees
  var marquees = [
    //x, y, w, h:
    [180, 175, 60, 45],
    [250, 175, 60, 45],
    [210, 210, 75, 100]
  ];

  marquees.forEach(function(m){
    var selection = '<div class="selection" style="';
    selection += 'left:'+m[0]+'px;top:'+m[1]+'px;width:'+m[2]+'px;height:'+m[3]+'px;"';
    selection += '"></div>';

    $videoWell.append(selection);
  })

}

