// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/*
 * JVFloat.js
 * modified on: 29/01/2014
 */(function($){"use strict";$.fn.jvFloat=function(){return this.filter('input:not([type=submit]), textarea').each(function(){var $el=$(this).wrap('<div class=jvFloat>');var forId=$el.attr('id');if(!forId)forId=createIdOnElement($el);var required=$el.attr('required')||'';var placeholder=$('<label class="placeHolder '+required+'" for="'+forId+'">'+$el.attr('placeholder')+'</label>').insertBefore($el);setState();$el.bind('keyup blur',setState);function setState(){placeholder.toggleClass('active',$el.val()!=='');}function generateUIDNotMoreThan1million(){do{var id=("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).substr(-4);}while(!!$('#'+id).length);return id;};function createIdOnElement($el){var id=generateUIDNotMoreThan1million();$el.prop('id',id);return id;};});};})(window.jQuery||window.Zepto||window.$);




/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0.3
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {

      var div = document.createElement('div'),
          ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0],
          cssStyles = '&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>';

      div.className = 'fit-vids-style';
      div.id = 'fit-vids-style';
      div.style.display = 'none';
      div.innerHTML = cssStyles;

      ref.parentNode.insertBefore(div,ref);

    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );



/*!
  Autosize v1.18.4 - 2014-01-11
  Automatically adjust textarea height based on user input.
  (c) 2014 Jack Moore - http://www.jacklmoore.com/autosize
  license: http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {
  var
  defaults = {
    className: 'autosizejs',
    append: '',
    callback: false,
    resizeDelay: 10,
    placeholder: true
  },

  // border:0 is unnecessary, but avoids a bug in Firefox on OSX
  copy = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',

  // line-height is conditionally included because IE7/IE8/old Opera do not return the correct value.
  typographyStyles = [
    'fontFamily',
    'fontSize',
    'fontWeight',
    'fontStyle',
    'letterSpacing',
    'textTransform',
    'wordSpacing',
    'textIndent'
  ],

  // to keep track which textarea is being mirrored when adjust() is called.
  mirrored,

  // the mirror element, which is used to calculate what size the mirrored element should be.
  mirror = $(copy).data('autosize', true)[0];

  // test that line-height can be accurately copied.
  mirror.style.lineHeight = '99px';
  if ($(mirror).css('lineHeight') === '99px') {
    typographyStyles.push('lineHeight');
  }
  mirror.style.lineHeight = '';

  $.fn.autosize = function (options) {
    if (!this.length) {
      return this;
    }

    options = $.extend({}, defaults, options || {});

    if (mirror.parentNode !== document.body) {
      $(document.body).append(mirror);
    }

    return this.each(function () {
      var
      ta = this,
      $ta = $(ta),
      maxHeight,
      minHeight,
      boxOffset = 0,
      callback = $.isFunction(options.callback),
      originalStyles = {
        height: ta.style.height,
        overflow: ta.style.overflow,
        overflowY: ta.style.overflowY,
        wordWrap: ta.style.wordWrap,
        resize: ta.style.resize
      },
      timeout,
      width = $ta.width();

      if ($ta.data('autosize')) {
        // exit if autosize has already been applied, or if the textarea is the mirror element.
        return;
      }
      $ta.data('autosize', true);

      if ($ta.css('box-sizing') === 'border-box' || $ta.css('-moz-box-sizing') === 'border-box' || $ta.css('-webkit-box-sizing') === 'border-box'){
        boxOffset = $ta.outerHeight() - $ta.height();
      }

      // IE8 and lower return 'auto', which parses to NaN, if no min-height is set.
      minHeight = Math.max(parseInt($ta.css('minHeight'), 10) - boxOffset || 0, $ta.height());

      $ta.css({
        overflow: 'hidden',
        overflowY: 'hidden',
        wordWrap: 'break-word', // horizontal overflow is hidden, so break-word is necessary for handling words longer than the textarea width
        resize: ($ta.css('resize') === 'none' || $ta.css('resize') === 'vertical') ? 'none' : 'horizontal'
      });

      // The mirror width must exactly match the textarea width, so using getBoundingClientRect because it doesn't round the sub-pixel value.
      // window.getComputedStyle, getBoundingClientRect returning a width are unsupported, but also unneeded in IE8 and lower.
      function setWidth() {
        var width;
        var style = window.getComputedStyle ? window.getComputedStyle(ta, null) : false;
        
        if (style) {

          width = ta.getBoundingClientRect().width;

          if (width === 0) {
            width = parseInt(style.width,10);
          }

          $.each(['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'], function(i,val){
            width -= parseInt(style[val],10);
          });
        } else {
          width = Math.max($ta.width(), 0);
        }

        mirror.style.width = width + 'px';
      }

      function initMirror() {
        var styles = {};

        mirrored = ta;
        mirror.className = options.className;
        maxHeight = parseInt($ta.css('maxHeight'), 10);

        // mirror is a duplicate textarea located off-screen that
        // is automatically updated to contain the same text as the
        // original textarea.  mirror always has a height of 0.
        // This gives a cross-browser supported way getting the actual
        // height of the text, through the scrollTop property.
        $.each(typographyStyles, function(i,val){
          styles[val] = $ta.css(val);
        });
        $(mirror).css(styles);

        setWidth();

        // Chrome-specific fix:
        // When the textarea y-overflow is hidden, Chrome doesn't reflow the text to account for the space
        // made available by removing the scrollbar. This workaround triggers the reflow for Chrome.
        if (window.chrome) {
          var width = ta.style.width;
          ta.style.width = '0px';
          var ignore = ta.offsetWidth;
          ta.style.width = width;
        }
      }

      // Using mainly bare JS in this function because it is going
      // to fire very often while typing, and needs to very efficient.
      function adjust() {
        var height, original;

        if (mirrored !== ta) {
          initMirror();
        } else {
          setWidth();
        }

        if (!ta.value && options.placeholder) {
          // If the textarea is empty, copy the placeholder text into 
          // the mirror control and use that for sizing so that we 
          // don't end up with placeholder getting trimmed.
          mirror.value = ($(ta).attr("placeholder") || '') + options.append;
        } else {
          mirror.value = ta.value + options.append;
        }

        mirror.style.overflowY = ta.style.overflowY;
        original = parseInt(ta.style.height,10);

        // Setting scrollTop to zero is needed in IE8 and lower for the next step to be accurately applied
        mirror.scrollTop = 0;

        mirror.scrollTop = 9e4;

        // Using scrollTop rather than scrollHeight because scrollHeight is non-standard and includes padding.
        height = mirror.scrollTop;

        if (maxHeight && height > maxHeight) {
          ta.style.overflowY = 'scroll';
          height = maxHeight;
        } else {
          ta.style.overflowY = 'hidden';
          if (height < minHeight) {
            height = minHeight;
          }
        }

        height += boxOffset;

        if (original !== height) {
          ta.style.height = height + 'px';
          if (callback) {
            options.callback.call(ta,ta);
          }
        }
      }

      function resize () {
        clearTimeout(timeout);
        timeout = setTimeout(function(){
          var newWidth = $ta.width();

          if (newWidth !== width) {
            width = newWidth;
            adjust();
          }
        }, parseInt(options.resizeDelay,10));
      }

      if ('onpropertychange' in ta) {
        if ('oninput' in ta) {
          // Detects IE9.  IE9 does not fire onpropertychange or oninput for deletions,
          // so binding to onkeyup to catch most of those occasions.  There is no way that I
          // know of to detect something like 'cut' in IE9.
          $ta.on('input.autosize keyup.autosize', adjust);
        } else {
          // IE7 / IE8
          $ta.on('propertychange.autosize', function(){
            if(event.propertyName === 'value'){
              adjust();
            }
          });
        }
      } else {
        // Modern Browsers
        $ta.on('input.autosize', adjust);
      }

      // Set options.resizeDelay to false if using fixed-width textarea elements.
      // Uses a timeout and width check to reduce the amount of times adjust needs to be called after window resize.

      if (options.resizeDelay !== false) {
        $(window).on('resize.autosize', resize);
      }

      // Event for manual triggering if needed.
      // Should only be needed when the value of the textarea is changed through JavaScript rather than user input.
      $ta.on('autosize.resize', adjust);

      // Event for manual triggering that also forces the styles to update as well.
      // Should only be needed if one of typography styles of the textarea change, and the textarea is already the target of the adjust method.
      $ta.on('autosize.resizeIncludeStyle', function() {
        mirrored = null;
        adjust();
      });

      $ta.on('autosize.destroy', function(){
        mirrored = null;
        clearTimeout(timeout);
        $(window).off('resize', resize);
        $ta
          .off('autosize')
          .off('.autosize')
          .css(originalStyles)
          .removeData('autosize');
      });

      // Call adjust in case the textarea already contains text.
      adjust();
    });
  };
}(window.jQuery || window.$)); // jQuery or jQuery-like library, such as Zepto
