module.exports = function(){
  console.log("Drawing marquees1");
  return new window.MarqueeHandler();
}

var $videoWell = $('#videoWell');
window.MarqueeHandler = function(){
  window.selection.forEach(function(m){

    /**Oh MarqueeTool, it would be so nice to be able to use you...**/
    // var newMarquee = new Marquee('videoWell', {color: '#F60', opacity: 0.45});
    // newMarquee.setCoords(m.source[0], m.source[1], m.source[2], m.source[3])

    var selection = '<div class="selection" style="';
    selection += 'left:'+m.source[0]+'px;top:'+m.source[1]+'px;width:'+m.source[2]+'px;height:'+m.source[3]+'px;"';
    selection += '></div>';

    // console.log("Drawing marquee: "+selection);
    // console.log($videoWell, $('#videoWell'));
    $('#videoWell').append(selection);
  })
}