$(document).ready(function() {
  //create a listener for textarea value
  $("#tweet-text").on("input", function() {

    //get the value of text input
    const $numberOfValues = $(this).val().length;

    //do the calculation to countdown from 140
    const $mathValues = 140 - $numberOfValues;

    //change the html value to the assigned value
    $($(this)).siblings(".tweet-count").find(".counter").html($mathValues);

    
  

    //change the color of texts if below 0
    if ($mathValues < 0) {
      $(".counter").css({
        'color': '#FF0000',
      })
    } else {
      $(".counter").css({
        'color': '#535149',
      })
    }
  })
});