// $Id:$

Drupal.behaviors.ooyalaMarkersJumpToAttach = function(context) {

  // Find all the chapter marker links.
  $('a.ooyala-markers-marker').click(function() {
    var href = $(this).attr('href');
    var time = parseInt(href.slice(href.indexOf('#') + 1));

    Drupal.ooyalaMarkersJumpTo(time);

    // Set the browser's URL so people can link directly to this chapter.
    window.location = href;
    return false;
  });
}

Drupal.ooyalaMarkersJumpTo = function(time) {
  // Jump the player to the appropriate time.
  // The time variable is converted to seconds here. Ooyala API claims that
  // it has millisecond accuracy so we denote times in milliseconds, however
  // the setPlayHeadTime method takes the number of seconds as an argument.
  document.getElementById('ooyala_player').setPlayheadTime(time/1000).playMovie();
}

// Event callback function recieves events from Ooyala API.
function receiveOoyalaEvent(playerId, eventName, p) {
  switch(eventName) {
    case 'apiReady':
      // If there is a #time in the current href jump to that point in the
      // video.
      var href = window.location.href;
      var time = parseInt(href.slice(href.indexOf('#') + 1));
      if (time) {
        Drupal.ooyalaMarkersJumpTo(time);
      }
    break;
  }
  return;
}
