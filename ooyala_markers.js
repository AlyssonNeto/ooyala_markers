// $Id:$
Drupal.behaviors.ooyalaMarkersJumpToAttach = function(context) {

  // Find all the chapter marker links.
  $('a.ooyala-markers-marker').click(function() {
    var href = $(this).attr('href');
    var fragment = href.slice(href.indexOf('#') + 1).split(':');

    player = document.getElementById(fragment[0] + '_ooyala_player');
    if (parseInt(fragment[1])) {
      Drupal.ooyalaMarkersJumpTo(player, fragment[1]);
    }

    // Set the browser's URL so people can link directly to this chapter.
    window.location = href;
    return false;
  });
}

/**
 * Tell Ooyala video player to jump to the specified time within the current
 * video.
 *
 * @param player
 *   Player DOM object.
 * @param time
 *   Time in milliseconds to jump to.
 */
Drupal.ooyalaMarkersJumpTo = function(player, time) {
  // Jump the player to the appropriate time.
  // The time variable is converted to seconds here. Ooyala API claims that
  // it has millisecond accuracy so we denote times in milliseconds, however
  // the setPlayHeadTime method takes the number of seconds as an argument.
  player.setPlayheadTime(time/1000);
  player.playMovie();
}

// Initialize Drupal.ooyala if it hasn't been yet since it is possible for this
// module's javascript to be loadded before ooyala_player.js
Drupal.ooyala = Drupal.ooyala || {'listeners': {}};

/**
 * Register event listener for ooyala API callbacks.
 */
Drupal.ooyala.listeners.ooyalaMarkers = function(player, eventName, p) {
  switch(eventName) {
    case 'apiReady':
      // If there is a #time in the current href jump to that point in the
      // video.
      var href = window.location.href;
      var fragment = href.slice(href.indexOf('#') + 1).split(':');
      if (fragment[0] && parseInt(fragment[1])) {
        Drupal.ooyalaMarkersJumpTo(player, fragment[1]);
      }
    break;
  }
  return;
};
