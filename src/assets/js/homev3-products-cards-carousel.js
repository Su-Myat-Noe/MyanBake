(function($, window){
    "use strict"; 
    var $owl_homev3_products_cards_carousel = $( '#homev3-products-cards-carousel .owl-carousel')
    $owl_homev3_products_cards_carousel.on( 'initialized.owl.carousel translated.owl.carousel', function() {
        var $this = $(this);
        $this.find( '.owl-item.last-active' ).each( function() {
            $(this).removeClass( 'last-active' );
        });
        $(this).find( '.owl-item.active' ).last().addClass( 'last-active' );
    });
    $owl_homev3_products_cards_carousel.owlCarousel({
        "items":1,
        "nav":false,
        "slideSpeed":300,
        "dots":true,
        "rtl":false,
        "paginationSpeed":400,
        "navText":["",""],
        "margin":0,
        "touchDrag":true
    });
})(jQuery);