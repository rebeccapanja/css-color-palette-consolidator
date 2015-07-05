function display(collection, parent) {
  var out = [];
  var size = 10;
  for (var i=0,l=collection.length; i<l; i++) {
    size = (Math.min(50, collection[i].count) * 2) + "px";
    out.push("<span class='color' style='background:"+collection[i].original+";width:"+size+"' title='"+collection[i].original+' : '+collection[i].count+"'><em>"+collection[i].original+"</em></span>");
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
  $('.extract').click(function(){
    extract();
  });
});
