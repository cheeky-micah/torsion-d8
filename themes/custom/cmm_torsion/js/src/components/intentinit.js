/*
 * @file    : intentinit.js
 * @purpose : intentinit module - initialize intention
 */
(function ($, Drupal, window, document) {
  
  /*
   * constructor
   */
  var InitIntent = function(context, settings) {
    this.init(context, settings);
  }; // InitIntent constructor


  /*
   * @method  : init
   * @purpose : initialize intentions context
   */
  InitIntent.prototype.init = function(context, settings) {
    var
      self = this;
    
    IntentContext.horizontal_axis.respond();
  }; // init()


  /*
   * on dom ready
   */
  Drupal.behaviors.initIntent = {
    attach: function (context, settings) {
      $(function () {
        IntentContext.intent.elements(document); 
        var initIntent = new InitIntent(context, settings);
      });
    }
  }; // dom ready
} (jQuery, Drupal, this, this.document));
