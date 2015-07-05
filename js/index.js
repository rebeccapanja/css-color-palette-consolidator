function display(collection, parent) {
  var out = [];
  var size = 10;
  for (var i=0,l=collection.length; i<l; i++) {
    size = (Math.min(35, collection[i].count) * 10) + "px";
    out.push("<div class='color' style='background:"+collection[i].original+"; height: "+size+"' title='"+collection[i].original+' : '+collection[i].count+"'><em>"+collection[i].original+"</em><span class='count'>"+collection[i].count+"</span></div>");
  }
  parent.html(out.join(""));
}

function extract() {
  var cssText = $('#source').val();
  Palette.init(cssText);
  display(Palette.bw, $('#bw'));
  display(Palette.colors, $('#colors'));
}

$(function() {
  //Extract css and setup bar graphs.
  $('.extract').click(function(){
    extract();
  });
});
