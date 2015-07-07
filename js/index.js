//Temporarily declared here
var selected_colors = []; 

function display(collection, parent) {
  var out = [];
  var size = 10;
  for (var i=0,l=collection.length; i<l; i++) {
    size = (Math.min(35, collection[i].count) * 10) + "px";
    out.push("<div class='color' style='background:"+collection[i].original+"; height: "+size+"' data-color='"+collection[i].original+"' title='"+collection[i].original+' : '+collection[i].count+"'><em>"+collection[i].original+"</em><span class='count'>"+collection[i].count+"</span></div>");
  }
  parent.html(out.join(""));
}

// Extract bar graph info from css
function extract() {
  var cssText = $('#source').val();
  Palette.init(cssText);
  display(Palette.bw, $('#bw'));
  display(Palette.colors, $('#colors'));

  // Reset
  selected_colors = [];
  RefreshClickListener();
}

// Handle click handler for dynamically created colors
function RefreshClickListener() {
  $('.color').off;

  $('.color').on("click", function() {
    selected_colors.push($(this).data('color'));
    $(this).addClass("selected");
  });
}

// Replace selected colors with chosen replacement color
function consolidate() {
  var end_goal_color = selected_colors.pop();
  var text = $('#source').val();
  var newstring;
  $('.selected').each(function(){
    var replace_this = $(this).data('color');
    var regex = new RegExp(replace_this, "ig");
    newstring = text.replace(regex, end_goal_color);
    text = newstring;
  });

  $('#source').val(text);
}

$(function() {
  $('.extract').on("click", function() {
    extract();
  });

   $('.replace').on("click", function() {
    consolidate();
  });
});
