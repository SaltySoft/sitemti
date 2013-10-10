define([
    'jquery'
], function ($) {

    var init = function () {
        //active and stuff
        var header = $("#header");

        header.find("a").click(function () {
            header.find(".active").removeClass("active");
            $(this).addClass("active");
        });

        header.find("li").click(function () {
            header.find(".text.active").removeClass("active");
            $(this).find(".text").addClass("active");
        });
    };

    return {
        init: init
    };
});