
$(document).ready(function() {

    "use strict";

    Showcase()

    var pagePiling = $('#page-scroll');
    if($(pagePiling).length){
        $(pagePiling).pagepiling({
            onLeave: function(index, nextIndex, direction){
                var i = index;
                var lastIndex = $('#pagepiling section:last').index();
                if(direction === 'down'){
                    $('#menu li a , #side-menu li a').removeClass('current');
                    $('#menu li , #side-menu li').eq(i).children().addClass('current');
                }
                else {
                    i-=2;
                    $('#menu li a , #side-menu li a').removeClass('current');
                    $('#menu li , #side-menu li').eq(i).children().addClass('current');
                }
            }
        });
    };
    $('#menu li a , #side-menu li a').on('click' , function (e) {
        e.preventDefault();
        var pageSection = $(this).parent().index();
        pageSection++;
        $.fn.pagepiling.moveTo(pageSection);
        $('#menu li a , #side-menu li a').removeClass('current');
        $(this).addClass('current');
    });

    if ($(window).width() < 991) {
        var pageSection = $(this).parent().index();
        $.fn.pagepiling.setAllowScrolling(false);
    }

     if ($(window).width() > 991) {
         animatedCursor();
     }
});

if ($(window).width() > 991) {
    setTimeout(function () {
        animatedCursor();
    }, 1000);
}

$(function () {

    setTimeout(function () {
        $("#loader-fade").fadeOut("slow");
        $('.side-menu').removeClass('dnone');
    }, 1000);

});


if ($("#sidemenu_toggle").length) {
    $("#sidemenu_toggle").on("click", function () {
        $(".side-nav-btn").addClass("active");
        $(".side-menu").addClass("side-menu-active"), $("#close_side_menu").fadeIn(700)
    }), $(".side-nav .navbar-nav .nav-link").on("click", function () {
        $(".side-menu").removeClass("side-menu-active"), $(".side-nav-btn").removeClass("active");
    }), $("#btn_sideNavClose").on("click", function () {
        $(".side-menu").removeClass("side-menu-active"),
            $(".side-nav-btn").removeClass("active");
    });
}




function Showcase() {

    $('.section-image').each(function() {
        var image = $(this).data('src');
        $(this).css({'background-image': 'url(' + image + ')'});
    });


    if( $('#showcase-slider').length > 0 ){

        var titles = [];
        var subtitle = [];
        var counter = [];
        $('#showcase-slider .swiper-slide').each(function(i) {
            titles.push($(this).data('title1'))
            subtitle.push($(this).data('subtitle'))
            counter.push($(this).data('number'))
        });

        var interleaveOffset = 0.4;

        var swiperOptions = {
            direction: "vertical",
            loop: false,
            grabCursor: true,
            resistance : true,
            resistanceRatio : 0,
            speed:1200,
            autoplay: false,
            effect: "slide",
            mousewheel: false,
           
            pagination: {
                el: '.showcase-pagination',
                clickable: false,
                renderBullet: function (index, className) {
                    return '<div class="tab__link ' + className + '">' + 
                               '<div class="counter-wrap">' + 
                                   
                               '</div>' + 
                               '<div class="row">' + 
                                   '<div class="col-12 col-xl-5">' + 
                                       '<div class="title1">' + 
                                           '<h1>' + titles[index] + '</h1>' + 
                                       '</div>' + 
                                       '<div class="subtitle">' + subtitle[index] + '</div>' + 
                                   '</div>' + 
                               '</div>' +
                               '<div class="counter">' + counter[index] + '</div>' +
                           '</div>';
                },
            },
        




            
         
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                progress: function() {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        var slideProgress = swiper.slides[i].progress;
                        var innerOffset = swiper.width * interleaveOffset;
                        var innerTranslate = slideProgress * innerOffset;
                        swiper.slides[i].querySelector(".img-mask").style.transform = "translate3d(" + innerTranslate + "px,0, 0)";
                    }
                },
                touchStart: function() {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = "";
                    }
                },
                setTransition: function(speed) {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = speed + "ms";
                        swiper.slides[i].querySelector(".img-mask").style.transition = speed + "ms";
                    }
                },
                init: function () {

                    $('.swiper-slide-active').find('video').each(function() {
                        $(this).get(0).play();
                    });

                },
                slideNextTransitionStart: function () {

                    var prevslidetitle = new TimelineLite();
                    prevslidetitle.staggerTo($('.swiper-pagination-bullet-active').prev().find('.title span'), 0.5, {scale:0.9, x:-100, opacity:0, ease:Power2.easeInOut},  0.02)
                    var prevslidecaption = new TimelineLite();
                    prevslidecaption.staggerTo($('.swiper-pagination-bullet-active').prev().find('.subtitle'), 0.5, {x:-20, opacity:0, delay:0.3, ease:Power2.easeIn},  0.02)

                    var activeslidetitle = new TimelineLite();
                    activeslidetitle.staggerTo($('.swiper-pagination-bullet-active').find('.title span'), 0.5, {scale:1, x:0, opacity:1, scale:1, delay:0.3, ease:Power2.easeOut}, 0.02)
                    var activeslidecaption = new TimelineLite();
                    activeslidecaption.staggerTo($('.swiper-pagination-bullet-active').find('.subtitle'), 0.5, {x:0, opacity:1, scale:1, delay:0.6, ease:Power2.easeOut}, 0.02)

                    var nextslidetitle = new TimelineLite();
                    nextslidetitle.staggerTo($('.swiper-pagination-bullet-active').next().find('.title span'), 0.5, {scale:1.1, x:100, opacity:0, ease:Power2.easeInOut},  0.02)
                    var nextslidecaption = new TimelineLite();
                    nextslidecaption.staggerTo($('.swiper-pagination-bullet-active').next().find('.subtitle'), 0.5, {x:20, opacity:0, delay:0.3, ease:Power2.easeIn},  0.02)

                    var tl = new TimelineLite();

                    $('.swiper-pagination-bullet-active').prev().find('.counter').each(function(index, element) {
                        tl.to(element, 0.3, {scale:1, y:-20, opacity:0, ease:Power2.easeIn}, index * 0.01)
                    });

                    $('.swiper-pagination-bullet-active').find('.counter').each(function(index, element) {
                        tl.to(element, 0.4, {scale:1, y:0, opacity:1, scale:1, delay:0.3, ease:Power2.easeOut}, index * 0.01)
                    });

                    $('.swiper-pagination-bullet-active').next().find('.counter').each(function(index, element) {
                        tl.to(element, 0.3, {scale:1, y:20, opacity:0, ease:Power2.easeIn}, index * 0.01)
                    });

                },
                slidePrevTransitionStart: function () {


                    var prevslidetitle = new TimelineLite();
                    prevslidetitle.staggerTo($('.swiper-pagination-bullet-active').prev().find('.title span'), 0.5, {scale:1.1, x:-100, opacity:0, ease:Power2.easeInOut},  -0.02)
                    var prevslidecaption = new TimelineLite();
                    prevslidecaption.staggerTo($('.swiper-pagination-bullet-active').prev().find('.subtitle'), 0.5, {x:-20, opacity:0, delay:0.3, ease:Power2.easeIn},  -0.02)

                    var activeslidetitle = new TimelineLite();
                    activeslidetitle.staggerTo($('.swiper-pagination-bullet-active').find('.title span'), 0.5, {scale:1, x:0, opacity:1, scale:1, delay:0.5, ease:Power2.easeOut}, -0.02)
                    var activeslidecaption = new TimelineLite();
                    activeslidecaption.staggerTo($('.swiper-pagination-bullet-active').find('.subtitle'), 0.5, {x:0, opacity:1, scale:1, delay:0.6, ease:Power2.easeOut}, -0.02)

                    var nextslidetitle = new TimelineLite();
                    nextslidetitle.staggerTo($('.swiper-pagination-bullet-active').next().find('.title span'), 0.5, {scale:0.9, x:100, opacity:0, ease:Power2.easeInOut},  -0.02)
                    var nextslidecaption = new TimelineLite();
                    nextslidecaption.staggerTo($('.swiper-pagination-bullet-active').next().find('.subtitle'), 0.5, {x:20, opacity:0, delay:0.3, ease:Power2.easeIn},  -0.02)


                    var tl = new TimelineLite();

                    $('.swiper-pagination-bullet-active').prev().find('.counter').each(function(index, element) {
                        tl.to(element, 0.3, {scale:1, y:-20, opacity:0, delay:0.1,  ease:Power2.easeIn}, index * 0.01)
                    });

                    $('.swiper-pagination-bullet-active').find('.counter').each(function(index, element) {
                        tl.to(element, 0.4, {scale:1, y:0, opacity:1, scale:1, delay:0.45, ease:Power2.easeOut}, index * 0.01)
                    });

                    $('.swiper-pagination-bullet-active').next().find('.counter').each(function(index, element) {
                        tl.to(element, 0.3, {scale:1, y:20, opacity:0, delay:0.1,  ease:Power2.easeIn}, index * 0.01)
                    });

                },
            },
        };




        function LinesWidth() {

            var carouselWidth = $('#showcase-holder').width();
            var captionWidth = $('.swiper-pagination-bullet-active .title').width();
            if ($(window).width() >= 1466) {
                lineWidth = carouselWidth / 2 - 440
            } else if ($(window).width() >= 1024) {
                lineWidth = carouselWidth / 2 - 220
            } else if ($(window).width() >= 767) {
                lineWidth = carouselWidth / 2 - 160
            } else if ($(window).width() >= 479) {
                lineWidth = carouselWidth / 2 - 50
            } else {
                lineWidth = carouselWidth / 2 - 40
            }

        }


        var swiper = new Swiper(".swiper-container", swiperOptions);

        swiperThumbs(swiper, {
            element: 'swiper-thumbnails',
            activeClass: 'is-active'
        });

        $('.title').each(function(){
            var words = $(this).text().slice(" ");
            var total = words.length;
            $(this).empty();
            for (index = 0; index < total; index ++){
                $(this).append($("<span /> ").text(words[index]));
            }
        });

        var maxTilt = 1.5;
        var mouseX, mouseY;
        $(document).on("mousemove", function(event) {
            mouseX = event.pageX;
            mouseY = event.pageY;
        });
        $('#showcase-tilt').each(function() {
            var thisWidth = $(this).width();
            var thisHeight = $(this).height();
            var thisOffset = $(this).offset();
            $(document).mousemove(function() {
                var horTilt = ((mouseX / thisWidth) * (maxTilt * 2)) - maxTilt;
                var verTilt = (((mouseY - thisOffset.top) / thisHeight) * (maxTilt * 2)) - maxTilt;
                TweenMax.to('#showcase-tilt', 1,{rotationY: horTilt, rotationX: verTilt, scale: 1.05, ease:Power1.easeOut});
            });
        });

        TweenMax.set($("#showcase-holder"), {opacity:0, scale:1.1});
        TweenMax.to($("#showcase-holder"), 0.8, {force3D:true, opacity:1, scale:1, delay:0, ease:Power2.easeOut});
        TweenMax.to($(".swiper-pagination-bullet-active .subtitle"), 0.4, {force3D:true, opacity:1, y:0, delay:0.1, ease:Power2.easeOut});
        TweenMax.to($(".swiper-pagination-bullet-active .title"), 0.4, {force3D:true, opacity:1, y:0, delay:0.15, ease:Power2.easeOut});
        TweenMax.to($(".showcase-counter, .swiper-pagination-bullet-active .counter, .arrows-wrap"), 0.3, {force3D:true, opacity:1, delay:0.15, ease:Power2.easeOut});


    }




}




function animatedCursor() {

    if ($("#aimated-cursor").length) {

        var e = {x: 0, y: 0}, t = {x: 0, y: 0}, n = .25, o = !1, a =    document.getElementById("cursor"),
            i = document.getElementById("cursor-loader");
        TweenLite.set(a, {xPercent: -50, yPercent: -50}), document.addEventListener("mousemove", function (t) {
            var n = window.pageYOffset || document.documentElement.scrollTop;
            e.x = t.pageX, e.y = t.pageY - n
        }), TweenLite.ticker.addEventListener("tick", function () {
            o || (t.x += (e.x - t.x) * n, t.y += (e.y - t.y) * n, TweenLite.set(a, {x: t.x, y: t.y}))
        }),
            $(".animated-wrap").mouseenter(function (e) {
                TweenMax.to(this, .3, {scale: 1.5}), TweenMax.to(a, .3, {
                    scale: 2,
                    borderWidth: "1px",
                    opacity: .2
                }), TweenMax.to(i, .3, {
                    scale: 2,
                    borderWidth: "1px",
                    top: 1,
                    left: 1
                }), TweenMax.to($(this).children(), .3, {scale: .7}), o = !0
            }),
            $(".animated-wrap").mouseleave(function (e) {
                TweenMax.to(this, .3, {scale: 1}), TweenMax.to(a, .3, {
                    scale: 1,
                    borderWidth: "2px",
                    opacity: 1
                }), TweenMax.to(i, .3, {
                    scale: 1,
                    borderWidth: "2px",
                    top: 0,
                    left: 0
                }), TweenMax.to($(this).children(), .3, {scale: 1, x: 0, y: 0}), o = !1
            }),
            $(".animated-wrap").mousemove(function (e) {
                var n, o, i, l, r, d, c, s, p, h, x, u, w, f, m;
                n = e, o = 2, i = this.getBoundingClientRect(), l = n.pageX - i.left, r = n.pageY - i.top, d = window.pageYOffset || document.documentElement.scrollTop, t.x = i.left + i.width / 2 + (l - i.width / 2) / o, t.y = i.top + i.height / 2 + (r - i.height / 2 - d) / o, TweenMax.to(a, .3, {
                    x: t.x,
                    y: t.y
                }), s = e, p = c = this, h = c.querySelector(".animated-element"), x = 20, u = p.getBoundingClientRect(), w = s.pageX - u.left, f = s.pageY - u.top, m = window.pageYOffset || document.documentElement.scrollTop, TweenMax.to(h, .3, {
                    x: (w - u.width / 2) / u.width * x,
                    y: (f - u.height / 2 - m) / u.height * x,
                    ease: Power2.easeOut
                })
            }),
            $(".hide-cursor,.btn,.tp-bullets").mouseenter(function (e) {
                TweenMax.to("#cursor", .2, {borderWidth: "1px", scale: 2, opacity: 0})
            }), $(".hide-cursor,.btn,.tp-bullets").mouseleave(function (e) {
            TweenMax.to("#cursor", .3, {borderWidth: "2px", scale: 1, opacity: 1})
        }),$(".link,#pp-nav li,.counter,.showcase-counter span").mouseenter(function (e) {
            TweenMax.to("#cursor", .2, {
                borderWidth: "0px",
                scale: 3,
                backgroundColor: "rgba(255,242,255,0.4)",
                opacity: .15
            })
        }), $(".link,#pp-nav li,.counter,.showcase-counter span").mouseleave(function (e) {
            TweenMax.to("#cursor", .3, {
                borderWidth: "2px",
                scale: 1,
                backgroundColor: "rgba(208, 5, 32, 0)",
                opacity: 1
            })
        })

    }

}


jQuery(function ($) {

    $("#testimonial-quote").owlCarousel({
        items: 1,
        autoplay: false,
        autoplayHoverPause: true,
        mouseDrag: true,
        loop: true,
        margin: 20,
        dots: true,
        dotsContainer: "#owl-thumbs",
        nav: false,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        responsive: {
            1280: {
                items: 1,
            },
            600: {
                items: 1,
            },
            320: {
                items: 1,
            },
        }
    });
    $("#testimonial-quote-nav").owlCarousel({
        items: 1,
        autoplay: 5000,
        autoplayHoverPause: true,
        mouseDrag: false,
        loop: true,
        margin: 30,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        dots: true,
        dotsContainer: "#owl-thumbs",
        nav: true,
        navText: ["<i class='fa fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"],
        responsive: {
            1280: {
                items: 1,
            },
            600: {
                items: 1,
            },
            320: {
                items: 1,
            },
        }
    });




    $("#services_slider").owlCarousel({
        items: 1,
        dots: true,
        nav: false,
        loop: true,
        mouseDrag: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplay: true,
        autoplayTimeout: 3000,
    });

    $('#services_slider .owl-dot').addClass('link');



    $("#submit_btn").on('click', function () {

        $("#submit_btn").attr("disabled", "disabled");
        $("#submit_btn b").text('Sending');
        $("#submit_btn i").removeClass('d-none');

        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_phone = $('input[name=phone]').val();
        var user_message = $('textarea[name=message]').val();

        var post_data, output;
        var proceed = true;
        if (user_name == "") {
            proceed = false;
        }
        if (user_email == "") {
            proceed = false;
        }

        if (user_message == "") {
            proceed = false;
        }
        if (proceed) {

            post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userPhone': user_phone,
                'userMessage': user_message
            };
        }
        else {
            output = '<div class="alert-danger" style="padding:10px 15px; margin-bottom:30px;">Please provide the missing fields.</div>';
            $("#result").hide().html(output).slideDown();

            $("#submit_btn").removeAttr("disabled");
            $("#submit_btn b").text('SUBMIT REQUEST');
            $("#submit_btn i").addClass('d-none');
        }

    });




    $(".progress-bar").each(function () {
        $(this).appear(function () {
            $(this).animate({width: $(this).attr("aria-valuenow") + "%"}, 3000)
        });
    });

    $('.count').each(function () {
        $(this).appear(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 3000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });


    var mainSlider = $('#main-slider-four');
    if($(mainSlider).length) {
        jQuery(mainSlider).show().revolution({
            sliderType: "standard",
            sliderLayout: "fullscreen",
            dottedOverlay: "none",
            delay: 9000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "off",
                arrows: {
                    style: "hesperiden link",
                    enable: true,
                    hide_onmobile: false,
                    hide_onleave: false,
                    tmp: '',
                    left: {
                        h_align: "center",
                        v_align: "bottom",
                        h_offset: -20,
                        v_offset: 8
                    },
                    right: {
                        h_align: "center",
                        v_align: "bottom",
                        h_offset: 20,
                        v_offset: 8
                    }
                }
            },
            responsiveLevels: [1240, 1240, 1240, 480],
            visibilityLevels: [1240, 1240, 1240, 480],
            gridwidth: [1200, 1200, 1200, 480],
            gridheight: [800, 800, 800, 700],
            lazyType: "none",
            parallax: {
                type: "mouse+scroll",
                origo: "slidercenter",
                speed: 400,
                speedbg: 0,
                speedls: 0,
                levels: [1, 2, 3, 4, 5, 6, 7, 8, 12, 16, 47, 48, 49, 50, 51, 55]
            },
            shadow: 0,
            spinner: "off",
            stopLoop: "on",
            stopAfterLoops: 0,
            stopAtSlide: 1,
            shuffle: "off",
            autoHeight: "off",
            fullScreenAutoWidth: "off",
            fullScreenAlignForce: "off",
            fullScreenOffsetContainer: "",
            fullScreenOffset: "",
            disableProgressBar: "on",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: false
            }
        });
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (
            msie > 0 ||
            !!navigator.userAgent.match(/Trident.*rv\:11\./) ||
            ("CSS" in window &&
                "supports" in window.CSS &&
                !window.CSS.supports("mix-blend-mode", "screen"))
        ) {
            var bgColor = "rgba(245, 245, 245, 0.5)";
            jQuery(
                ".rev_slider .tp-caption.tp-blendvideo[data-blendmode]"
            ).remove();
        }


        RevSliderBeforeAfter(jQuery, jQuery("#main-slider-four"), {
            arrowStyles: {
                leftIcon: "fa fa-caret-left",
                rightIcon: "fa fa-caret-right",
                topIcon: "fa fa-caret-up",
                bottomIcon: "fa fa-caret-bottom",
                size: "35",
                color: "#ffffff",
                bgColor: "transparent",
                spacing: "10",
                padding: "0",
                borderRadius: "0"
            },
            parallax: {
                type: "mouse+scroll",
                origo: "slidercenter",
                speed: 400,
                speedbg: 0,
                speedls: 0,
                levels: [1, 2, 3, 4, 5, 6, 7, 8, 12, 16, 47, 48, 49, 50, 51, 55]
            },
            dividerStyles: {
                width: "1",
                color: "rgba(255, 255, 255, 0.5)"
            },
            onClick: {
                time: "500",
                easing: "Power2.easeOut"
            },
            cursor: "move",
            carousel: false
        });

    };


});



document.addEventListener("DOMContentLoaded", function() {
    var imageBackground = document.getElementById("image-background");

    setTimeout(function() {
        imageBackground.style.opacity = "1";
    }, 1000);

    imageBackground.addEventListener("click", function() {
        imageBackground.classList.toggle("grow");
    });
});
