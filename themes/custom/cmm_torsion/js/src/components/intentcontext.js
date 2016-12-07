/*
 * @file    : intentconext.js
 * @purpose : intentionJS contexts setup and init
 */
(function ($, Drupal, window, document) {

  var
    IntentContext = window.IntentContext ? window.IntentContext : window.IntentContext = {};

  IntentContext.intent = new Intention();

  // Breakpoints
  IntentContext.xxlarge = 1640;
  IntentContext.xlarge = 1520;
  IntentContext.large = 1025;
  IntentContext.mediumportrait = 769;
  IntentContext.medium = 641;
  IntentContext.smallportrait = 321;
  IntentContext.small = 0;

  // setup breakpoints for intentionJS
  IntentContext.horizontal_axis = IntentContext.intent.responsive({
    ID: 'width',
    contexts: [{
      name: 'xxlarge',
      min: IntentContext.xxlarge
    }, {
      name: 'xlarge',
      min: IntentContext.xlarge
    }, {
      name: 'large',
      min: IntentContext.large
    }, {
      name: 'mediumportrait',
      min: IntentContext.mediumportrait
    }, {
      name: 'medium',
      min: IntentContext.medium
    }, {
      name: 'smallportrait',
      min: IntentContext.smallportrait
    }, {
      name: 'small',
      min: IntentContext.small
    }],
    matcher: function (measure, context) {
      return measure >= context.min;
    },
    measure: function () {
      IntentContext.v_width = viewportSize.getWidth();
      return IntentContext.v_width;
    }
  });

  jQuery(document).ready(function($) {
    'use strict';
    $(window).on('resize', IntentContext.horizontal_axis.respond);
  });
  
} (jQuery, Drupal, this, this.document));
