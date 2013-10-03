module.exports = function(){

  var url = document.URL.split('=');
  var projectorLink = '/projector'

  if(url.length > 1){
    projectorLink += '?id=' + url[url.length-1];

  }

  console.log("Adding in link: "+projectorLink);

  var link = $('a');
  link.attr('href', projectorLink);
  link.text(projectorLink);

}