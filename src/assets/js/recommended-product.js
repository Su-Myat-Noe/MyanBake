(function($) {
    'use strict';


    /*===================================================================================*/
    /*  WOW
    /*===================================================================================*/

    $(document).ready(function () {
        new WOW().init();
    });

    /*===================================================================================*/
    /*  OWL CAROUSEL
    /*===================================================================================*/

    $(document).ready(function () {
        var $owl_recommended_product = $( '#recommended-product .owl-carousel');
        $owl_recommended_product.on( 'initialized.owl.carousel translated.owl.carousel', function() {
            var $this = $(this);
            $this.find( '.owl-item.last-active' ).each( function() {
                $(this).removeClass( 'last-active' );
            });
            $(this).find( '.owl-item.active' ).last().addClass( 'last-active' );
        });
        $owl_recommended_product.owlCarousel({
            "items":"4",
            "nav":false,
            "slideSpeed":300,
            "dots":"true",
            "rtl":false,
            "paginationSpeed":400,
            "navText":["",""],
            "margin":0,
            "touchDrag":false,
            "responsive":{
                "0":{
                    "items":1
                },
                "480":{
                    "items":3
                },
                "768":{
                    "items":2
                },
                "992":{
                    "items":3
                },
                "1200":{
                    "items":4
                }
            },

        });
    });

})(jQuery);

    