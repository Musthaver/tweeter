$(document).ready(function() {
  $('.new-tweet form textarea').on('input', function(event) {
    const length = $(this).val().length;
    const originalCounter = $(this).parent().find('.counter');
    const count = 140 - length; 
    originalCounter.text(count);

    //add class for red CSS when under 0
    (count < 0) ? originalCounter.addClass("red") : originalCounter.removeClass("red");

    $('.new-tweet form').on('submit', function(event) {
        originalCounter.text(140);
    });
  });
});
