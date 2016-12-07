/*
 * @file    : front-page.js
 * @purpose : run JS that is used on front-page only
 */
(function ($, Drupal, window, document) {
  "use strict";

  /*
   * constructor
   */
  var Frontpage = function(context, settings) {
    var
      self = this;
      
    $('body').once('frontpage').each(function() {
      self.init(context, settings);
    });
  }; // Frontpage constructor


  /*
   * @method  : init
   * @purpose : initialize everything
   */
  Frontpage.prototype.init = function(context, settings) {
    var
      self = this;

    $(context).find('body').each(function() {
      // do stuff for front
    });
  }; // init()

  /*
   * on document ready
   */
  Drupal.behaviors.frontpage = {
    attach: function (context, settings) {
      var frontpage = new Frontpage(context, settings);
    }
  }; // dom ready
} (jQuery, Drupal, this, this.document));
