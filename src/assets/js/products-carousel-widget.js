(function($, window){
    "use strict"; 
$('.products-carousel-widget').owlCarousel({
    items : 1,
    nav : true,
    slideSpeed : 300,
    dots: false,
    paginationSpeed : 400,
    navText: ["", ""],
    autoHeight: false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});
})(jQuery);