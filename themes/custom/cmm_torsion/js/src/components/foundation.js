/*
 * @file    : foundation.js
 * @purpose : foundation module
 */
(function ($, Drupal, window, document) {

  /*
   * constructor
   */
  var InitFoundation = function(context, settings) {
    this.init(context, settings);
  }; // constructor


  /*
   * @method  : init
   * @purpose : intialise foundation
   */
  InitFoundation.prototype.init = function(context, settings) {
    var self = this;
    $(document).foundation();
  }; // init()


  /*
   * on document ready
   */
  Drupal.behaviors.initFoundations = {
    attach: function (context, settings) {
      $(function () {
        $(context).find('html').each(function() {
          var initFoundation = new InitFoundation(context, settings);
        });
      });
    }
  }; // dom ready
} (jQuery, Drupal, this, this.document));
