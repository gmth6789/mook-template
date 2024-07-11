"use strict";

var KTLandingPage = function () {
    var initTyped = function() {
        var typed = new Typed("#kt_landing_hero_text", {
            strings: ["The Best Theme Ever", "The Most Trusted Theme", "#1 Selling Theme"],
            typeSpeed: 50
        });
    }

    
    return {
        init: function () {
            //initTyped();
        }   
    }
}();

// Webpack support
if (typeof module !== 'undefined') {
    module.exports = KTLandingPage;
}

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTLandingPage.init();
});
