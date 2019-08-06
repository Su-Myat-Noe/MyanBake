(function($, window){
    
    "use strict"; 
    var $owl_recently_added_products_carousel = $( '#recently-added-products-carousel .owl-carousel');
        $owl_recently_added_products_carousel.on( 'initialized.owl.carousel translated.owl.carousel', function() {
            var $this = $(this);
            $this.find( '.owl-item.last-active' ).each( function() {
                $(this).removeClass( 'last-active' );
            });
            $(this).find( '.owl-item.active' ).last().addClass( 'last-active' );
        });
        $owl_recently_added_products_carousel.owlCarousel({
            "items":"6",
            "nav":true,
            "slideSpeed":300,
            "dots":true,
            "rtl":false,
            "paginationSpeed":400,
            "navText":["",""],
            "margin":0,
            "touchDrag":true,
            responsive : {
                0 : {
                    items : 1,
                },
                480: {
                    items : 2,
                },
                768 : {
                    items : 2,
                },
                992 : {
                    items : 3,
                },
                1200 : {
                    items : 6,
                },
                onTranslate : function(){
                  echo.render();
                }
            },

        });
            
    $('.recently-added-products').owlCarousel({
        "items":1,
        "nav":false,
        "slideSpeed":300,
        "dots":true,
        "rtl":false,
        "paginationSpeed":400,
        "navText":["",""],
        "margin":0,
        "touchDrag":true,
        "responsive":{
            "0":{
                "items":1
            },
            "480":{
                "items":1
            },
            "768":{
                "items":2
            },
            "992":{
                "items":3
            },
            "1200":{
                "items":1
            }
        },
    });

})(jQuery);