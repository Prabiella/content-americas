

$('.testimonial-two').owlCarousel({
    loop: true,
    smartSpeed: 500,
    responsiveClass: true,
    nav:false,
    dots:false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    responsive: {
        0: {
            items: 1,
            margin: 30,
        },
        480: {
            items: 1,
            margin: 30,
        },
        992: {
            items: 1,
            margin: 30,
        }
    }
});

var owl = $('.testimonial-two');
owl.owlCarousel();
$('#team-circle-left').click(function () {
    owl.trigger('prev.owl.carousel');
});

$('#team-circle-right').click(function () {
    owl.trigger('next.owl.carousel');
});

