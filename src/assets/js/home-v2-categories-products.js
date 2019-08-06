(function($, window){
    "use strict"; 
$('.home-v2-categories-products').owlCarousel({
    "items":4,
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
            "items":4
        }
    },
});

})(jQuery);