(function($, window){
    "use strict"; 
    var $owl_product_carousel_with_image = $( '#products-carousel-with-umage .owl-carousel')
    $owl_product_carousel_with_image.on( 'initialized.owl.carousel translated.owl.carousel', function() {
        var $this = $(this);
        $this.find( '.owl-item.last-active' ).each( function() {
            $(this).removeClass( 'last-active' );
        });
        $(this).find( '.owl-item.active' ).last().addClass( 'last-active' );
    });
    $owl_product_carousel_with_image.owlCarousel({
        "items":2,
        "nav":false,
        "slideSpeed":300,
        "dots":true,
        "rtl":false,
        "paginationSpeed":400,
        "navText":["",""],
        "margin":30,
        "touchDrag":true,
        "responsive":{
            "0":{
                "items":1
            },
            "480":{
                "items":1
            },
            "768":{
                "items":1
            },
            "992":{
                "items":2
            },
            "1200":{
                "items":2
            }
        },
    });

})(jQuery);