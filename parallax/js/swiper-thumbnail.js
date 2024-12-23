(function ($, window) {

    /**
     * @param swiper 
     * @param settings 
     */
    window.swiperThumbs = function (swiper, settings) {


        $(swiper).each(function () {

            var _this = this;

            var options = {
                element: 'swiper-thumbnails',
                activeClass: 'is-active',
                scope: undefined
            };


            $.extend(options, settings);

            var element;
            if (typeof options.scope !== "undefined") {
                element = $(_this.wrapperEl).closest(options.scope).find('.' + options.element);
            } else {
                element = $('.' + options.element);
            }

            /**
             * @returns {*}
             */
            var realIndex = function (index) {
                if (index === undefined) index = _this.activeIndex;

                if (_this.params.loop) {
                    return parseInt(_this.slides.eq(index).attr('data-swiper-slide-index'));
                } else {
                    return index;
                }
            };

            var app = {

                init: function () {
                    app.bindUIevents();
                    app.updateActiveClasses(realIndex(_this.activeIndex));
                },

                bindUIevents: function () {

                    element.children().each(function () {
                        $(this).on('click', function () {

                            var index = parseInt($(this).index());

                            var difference = (index - realIndex());

                            app.moveToSlide(_this.activeIndex + difference);

                            if(difference > 0){
                                var prevslidetitle = new TimelineLite();
                                prevslidetitle.staggerTo($('.swiper-pagination-bullet').not('.swiper-pagination-bullet-active').find('.title span'), 0.5, {scale:0.9, x:-100, opacity:0, ease:Power2.easeInOut},  0.02)
                                var prevslidecaption = new TimelineLite();
                                prevslidecaption.staggerTo($('.swiper-pagination-bullet').not('.swiper-pagination-bullet-active').find('.subtitle'), 0.5, {x:-20, opacity:0, delay:0.3, ease:Power2.easeIn},  0.02);
                                var activeslidetitle = new TimelineLite();
                                activeslidetitle.staggerTo($('.swiper-pagination-bullet-active').find('.title span'), 0.5, {scale:1, x:0, opacity:1, scale:1, delay:0.3, ease:Power2.easeOut}, 0.02)
                                var activeslidecaption = new TimelineLite();
                                activeslidecaption.staggerTo($('.swiper-pagination-bullet-active').find('.subtitle'), 0.5, {x:0, opacity:1, scale:1, delay:0.6, ease:Power2.easeOut}, 0.02)
                                var tl = new TimelineLite();
                                $('.swiper-pagination-bullet').not('.swiper-pagination-bullet-active').find('.counter').each(function(index, element) {
                                    tl.to(element, 0.3, {scale:1, y:-20, opacity:0, ease:Power2.easeIn}, index * 0.01)
                                });

                                $('.swiper-pagination-bullet-active').find('.counter').each(function(index, element) {
                                    tl.to(element, 0.4, {scale:1, y:0, opacity:1, scale:1, delay:0.3, ease:Power2.easeOut}, index * 0.01)
                                });

                            }
                            else if(difference < 0){
                                var nextslidetitle = new TimelineLite();
                                nextslidetitle.staggerTo($('.swiper-pagination-bullet').not('.swiper-pagination-bullet-active').find('.title span'), 0.5, {scale:1.1, x:100, opacity:0, ease:Power2.easeInOut},  0.02)
                                var nextslidecaption = new TimelineLite();
                                nextslidecaption.staggerTo($('.swiper-pagination-bullet').not('.swiper-pagination-bullet-active').find('.subtitle'), 0.5, {x:20, opacity:0, delay:0.3, ease:Power2.easeIn},  0.02);
                                //
                                var activeslidetitle = new TimelineLite();
                                activeslidetitle.staggerTo($('.swiper-pagination-bullet-active').find('.title span'), 0.5, {scale:1, x:0, opacity:1, scale:1, delay:0.5, ease:Power2.easeOut}, -0.02)
                                var activeslidecaption = new TimelineLite();
                                activeslidecaption.staggerTo($('.swiper-pagination-bullet-active').find('.subtitle'), 0.5, {x:0, opacity:1, scale:1, delay:0.6, ease:Power2.easeOut}, -0.02)
                                //
                                var tl = new TimelineLite();
                                $('.swiper-pagination-bullet').not('.swiper-pagination-bullet-active').find('.counter').each(function(index, element) {
                                    tl.to(element, 0.3, {scale:1, y:20, opacity:0, ease:Power2.easeIn}, index * 0.01)
                                });

                                $('.swiper-pagination-bullet-active').find('.counter').each(function(index, element) {
                                    tl.to(element, 0.4, {scale:1, y:0, opacity:1, scale:1, delay:0.3, ease:Power2.easeOut}, index * 0.01)
                                });
                            }
                        })
                    });


                    _this.on('slideChange', function (swiper) {
                        app.updateActiveClasses(realIndex())
                    });
                },

                moveToSlide: function (index) {
                    _this.slideTo(index);
                },

                updateActiveClasses: function (index) {
                    element.children().removeClass(options.activeClass);
                    element.children().eq(index).addClass(options.activeClass);
                }
            };

            app.init();

        });

    };

}(jQuery, window));