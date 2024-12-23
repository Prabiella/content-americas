/*! flip - v1.1.2 - 2016-10-20
* https://github.com/nnattawat/flip
* Copyright (c) 2016 Nattawat Nonsung; Licensed MIT */
(function( $ ) {

    var whichTransitionEvent = function() {
        var t, el = document.createElement("fakeelement"),
            transitions = {
                "transition"      : "transitionend",
                "OTransition"     : "oTransitionEnd",
                "MozTransition"   : "transitionend",
                "WebkitTransition": "webkitTransitionEnd"
            };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    };


    var Flip = function($el, options, callback) {
        this.setting = {
            axis: "y",
            reverse: false,
            trigger: "click",
            speed: 500,
            forceHeight: false,
            forceWidth: false,
            autoSize: true,
            front: '.front',
            back: '.back'
        };

        this.setting = $.extend(this.setting, options);

        if (typeof options.axis === 'string' && (options.axis.toLowerCase() === 'x' || options.axis.toLowerCase() === 'y')) {
            this.setting.axis = options.axis.toLowerCase();
        }

        if (typeof options.reverse === "boolean") {
            this.setting.reverse = options.reverse;
        }

        if (typeof options.trigger === 'string') {
            this.setting.trigger = options.trigger.toLowerCase();
        }

        var speed = parseInt(options.speed);
        if (!isNaN(speed)) {
            this.setting.speed = speed;
        }

        if (typeof options.forceHeight === "boolean") {
            this.setting.forceHeight = options.forceHeight;
        }

        if (typeof options.forceWidth === "boolean") {
            this.setting.forceWidth = options.forceWidth;
        }

        if (typeof options.autoSize === "boolean") {
            this.setting.autoSize = options.autoSize;
        }

        if (typeof options.front === 'string' || options.front instanceof $) {
            this.setting.front = options.front;
        }

        if (typeof options.back === 'string' || options.back instanceof $) {
            this.setting.back = options.back;
        }

        this.element = $el;
        this.frontElement = this.getFrontElement();
        this.backElement = this.getBackElement();
        this.isFlipped = false;

        this.init(callback);
    };


    $.extend(Flip.prototype, {

        flipDone: function(callback) {
            var self = this;
            self.element.one(whichTransitionEvent(), function() {
                self.element.trigger('flip:done');
                if (typeof callback === 'function') {
                    callback.call(self.element);
                }
            });
        },

        flip: function(callback) {
            if (this.isFlipped) {
                return;
            }

            this.isFlipped = true;

            var rotateAxis = "rotate" + this.setting.axis;
            this.frontElement.css({
                transform: rotateAxis + (this.setting.reverse ? "(-180deg)" : "(180deg)"),
                "z-index": "0"
            });

            this.backElement.css({
                transform: rotateAxis + "(0deg)",
                "z-index": "1"
            });
            this.flipDone(callback);
        },

        unflip: function(callback) {
            if (!this.isFlipped) {
                return;
            }

            this.isFlipped = false;

            var rotateAxis = "rotate" + this.setting.axis;
            this.frontElement.css({
                transform: rotateAxis + "(0deg)",
                "z-index": "1"
            });

            this.backElement.css({
                transform: rotateAxis + (this.setting.reverse ? "(180deg)" : "(-180deg)"),
                "z-index": "0"
            });
            this.flipDone(callback);
        },

        getFrontElement: function() {
            if (this.setting.front instanceof $) {
                return this.setting.front;
            } else {
                return this.element.find(this.setting.front);
            }
        },

        getBackElement: function() {
            if (this.setting.back instanceof $) {
                return this.setting.back;
            } else {
                return this.element.find(this.setting.back);
            }
        },

        init: function(callback) {
            var self = this;

            var faces = self.frontElement.add(self.backElement);
            var rotateAxis = "rotate" + self.setting.axis;
            var perspective = self.element["outer" + (rotateAxis === "rotatex" ? "Height" : "Width")]() * 2;
            var elementCss = {
                'perspective': perspective,
                'position': 'relative'
            };
            var backElementCss = {
                "transform": rotateAxis + "(" + (self.setting.reverse ? "180deg" : "-180deg") + ")",
                "z-index": "0",
                "position": "relative"
            };
            var faceElementCss = {
                "backface-visibility": "hidden",
                "transform-style": "preserve-3d",
                "position": "absolute",
                "z-index": "1"
            };

            if (self.setting.forceHeight) {
                faces.outerHeight(self.element.height());
            } else if (self.setting.autoSize) {
                faceElementCss.height = '100%';
            }

            if (self.setting.forceWidth) {
                faces.outerWidth(self.element.width());
            } else if (self.setting.autoSize) {
                faceElementCss.width = '100%';
            }

            if ((window.chrome || (window.Intl && Intl.v8BreakIterator)) && 'CSS' in window) {
                elementCss["-webkit-transform-style"] = "preserve-3d";
            }


            faces.css(faceElementCss).find('*').css({
                "backface-visibility": "hidden"
            });

            self.element.css(elementCss);
            self.backElement.css(backElementCss);

            setTimeout(function() {
                var speedInSec = self.setting.speed / 1000 || 0.5;
                faces.css({
                    "transition": "all " + speedInSec + "s ease-out"
                });

                if (typeof callback === 'function') {
                    callback.call(self.element);
                }

            }, 20);

            self.attachEvents();
        },

        clickHandler: function(event) {
            if (!event) { event = window.event; }
            if (this.element.find($(event.target).closest('button, a, input[type="submit"]')).length) {
                return;
            }

            if (this.isFlipped) {
                this.unflip();
            } else {
                this.flip();
            }
        },

        hoverHandler: function() {
            var self = this;
            self.element.off('mouseleave.flip');

            self.flip();

            setTimeout(function() {
                self.element.on('mouseleave.flip', $.proxy(self.unflip, self));
                if (!self.element.is(":hover")) {
                    self.unflip();
                }
            }, (self.setting.speed + 150));
        },

        attachEvents: function() {
            var self = this;
            if (self.setting.trigger === "click") {
                self.element.on($.fn.tap ? "tap.flip" : "click.flip", $.proxy(self.clickHandler, self));
            } else if (self.setting.trigger === "hover") {
                self.element.on('mouseenter.flip', $.proxy(self.hoverHandler, self));
                self.element.on('mouseleave.flip', $.proxy(self.unflip, self));
            }
        },

        flipChanged: function(callback) {
            this.element.trigger('flip:change');
            if (typeof callback === 'function') {
                callback.call(this.element);
            }
        },

        changeSettings: function(options, callback) {
            var self = this;
            var changeNeeded = false;

            if (options.axis !== undefined && self.setting.axis !== options.axis.toLowerCase()) {
                self.setting.axis = options.axis.toLowerCase();
                changeNeeded = true;
            }

            if (options.reverse !== undefined && self.setting.reverse !== options.reverse) {
                self.setting.reverse = options.reverse;
                changeNeeded = true;
            }

            if (changeNeeded) {
                var faces = self.frontElement.add(self.backElement);
                var savedTrans = faces.css(["transition-property", "transition-timing-function", "transition-duration", "transition-delay"]);

                faces.css({
                    transition: "none"
                });

                var rotateAxis = "rotate" + self.setting.axis;

                if (self.isFlipped) {
                    self.frontElement.css({
                        transform: rotateAxis + (self.setting.reverse ? "(-180deg)" : "(180deg)"),
                        "z-index": "0"
                    });
                } else {
                    self.backElement.css({
                        transform: rotateAxis + (self.setting.reverse ? "(180deg)" : "(-180deg)"),
                        "z-index": "0"
                    });
                }
                setTimeout(function() {
                    faces.css(savedTrans);
                    self.flipChanged(callback);
                }, 0);
            } else {
                self.flipChanged(callback);
            }
        }

    });


    $.fn.flip = function (options, callback) {
        if (typeof options === 'function') {
            callback = options;
        }

        if (typeof options === "string" || typeof options === "boolean") {
            this.each(function() {
                var flip = $(this).data('flip-model');

                if (options === "toggle") {
                    options = !flip.isFlipped;
                }

                if (options) {
                    flip.flip(callback);
                } else {
                    flip.unflip(callback);
                }
            });
        } else {
            this.each(function() {
                if ($(this).data('flip-model')) { 
                    var flip = $(this).data('flip-model');

                    if (options && (options.axis !== undefined || options.reverse !== undefined)) {
                        flip.changeSettings(options, callback);
                    }
                } else { 
                    $(this).data('flip-model', new Flip($(this), (options || {}), callback));
                }
            });
        }

        return this;
    };

}( jQuery ));