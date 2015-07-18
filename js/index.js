//Temporarily declared here
var selected_colors = []; 

function display(collection, parent) {
  var out = [];
  var size = 10;
  for (var i=0,l=collection.length; i<l; i++) {
    size = (Math.min(35, collection[i].count) * 10) + 'px';
    out.push("<div class='color' style='background:"+collection[i].original+"; height: "+size+"' data-color='"+collection[i].original+"' title='"+collection[i].original+' : '+collection[i].count+"'><em>"+collection[i].original+"</em><span class='count'>"+collection[i].count+"</span></div>");
  }
  parent.html(out.join(''));
}

// Extract bar graph info from css
function extract() {
  var cssText = $('#source').val();
  Palette.init(cssText);
  display(Palette.bw, $('#bw'));
  display(Palette.colors, $('#colors'));
  $('.color-palette').show();

  // Reset
  selected_colors = [];
  RefreshClickListener();
}

// Handle click handler for dynamically created colors
function RefreshClickListener() {
  var current_color;
  $('.color').off;

  $('.color').on('click', function() {
    current_color = $(this).data('color');
    if($(this).hasClass('selected')) {
      // Remove from array
      $(this).removeClass('selected');
      selected_colors.splice(selected_colors.indexOf(current_color), 1);
      // TODO: update last replacement color too
    } else {
      selected_colors.push(current_color);
      $(this).addClass('selected');
    }

    // Update span replacement-color
    $('span.replacement-color').text(current_color);
  });
}

// Replace selected colors with chosen replacement color
function consolidate() {
  var end_goal_color = selected_colors.pop();
  var text = $('#source').val();
  var newstring;
  $('.selected').each(function(){
    var replace_this = $(this).data('color');
    var regex = new RegExp(replace_this, 'ig');
    newstring = text.replace(regex, end_goal_color);
    text = newstring;
  });

  $('span.replacement-color').text('last color');
  $('#source').val(text);
  extract();
}

$(function() {
  $('.extract').on('click', function() {
    extract();
  });

   $('.replace').on('click', function() {
    consolidate();
  });
});
