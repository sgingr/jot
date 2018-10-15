import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({

  didInsertElement() {
    console.log('home - didInsertElement');
    var lastY = 0; // Needed in order to determine direction of scroll.
    $(".scroll-container").on('touchstart', function(event) {
      lastY = event.touches[0].clientY;
    });

    $('.scroller').on('touchmove', function(event) {
      console.log('in the touch');
      var top = event.touches[0].clientY;

      // Determine scroll position and direction.
      var scrollTop = $(event.currentTarget).scrollTop();
      var direction = (lastY - top) < 0 ? "up" : "down";

      // FIX IT!
      if (scrollTop == 0 && direction == "up") {
        // Prevent scrolling up when already at top as this introduces a freeze.
        event.preventDefault();
      } else if (scrollTop >= (event.currentTarget.scrollHeight - $(event.currentTarget).outerHeight()) && direction == "down") {
        // Prevent scrolling down when already at bottom as this also introduces a freeze.
        event.preventDefault();
      }

      lastY = top;
    });
  }

});
