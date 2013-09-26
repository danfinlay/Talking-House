//Initial configuration:
var $body = $('body');
var mouseIsDown = false;
var newMarqueeMode = false;
var marqueeMidEdit = false;
var mouseLocation;
var marquees = [];
var newMarquee;

//"New" button toggles new marquee mode:
$('button#newMarquee').click(function(event){
  newMarqueeMode = !newMarqueeMode;
  console.log("New marquee mode: "+newMarqueeMode);
});

$body.mousedown(function(event){
  updateMouseLocation();
  mouseIsDown = true;
  if(newMarqueeMode){
    newMarqueeMode = false;
    marqueeMidEdit = true;
    newMarquee = new Marquee('myphoto', {
      color: '#ff0000',
      type: 'window',
      showTooltip: false
    });
  }
 });

$body.mouseup(function(event){
  updateMouseLocation();
  mouseIsDown = false;
  marqueeMidEdit = false;

  marquees.push(newMarquee);
})

window.onmousemove = function(event) {

  updateMouseLocation();
  if(mouseIsDown){
    ignoreClicks = true;
    isDragging = true;
      event = event || window.event; // IE-ism
      draggedTo(event.clientX, event.clientY);
  }
}

function updateMouseLocation(event){
  event = event || window.event; // IE-ism
  mouseLocation = [event.clientX, event.clientY];
}