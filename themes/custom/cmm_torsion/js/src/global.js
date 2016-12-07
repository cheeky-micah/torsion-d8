/*
 * @file    : global.js
 * @purpose : run JS that is used globally on site
 */
(function ($, Drupal, window, document) {
  "use strict";

  /*
   * constructor
   */
  var GlobalSite = function(context, settings) {
    self = this;
    $('body').once('globalSite').each(function() {
      self.init(context, settings);
    });
  }; // GlobalSite constructor


  /*
   * @method  : init
   * @purpose : initialize everything
   */
  GlobalSite.prototype.init = function(context, settings) {
    var
      self = this;

    $(context).find('body').each(function() {
      // do stuff
    });
  }; // init()

  /*
   * on document ready
   */
  Drupal.behaviors.globalSite = {
    attach: function (context, settings) {
      var globalSite = new GlobalSite(context, settings);
    }
  }; // dom ready
} (jQuery, Drupal, this, this.document));
