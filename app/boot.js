define([
    'jquery',
    "underscore",
    'backbone',
    'resources/pageslist'
], function ($, _, Backbone, pages_list) {
    console.log(Backbone);
    var header = $("#header");

    var Router = Backbone.Router.extend({
        routes:{

        }
    });
    var router = new Router();
    var hash = window.location.hash;
    var current_offset = 0;

    var move_right = function () {
        if (current_offset < pages_list.length - 1) {
            var urls = pages_list[++current_offset].urls;
            window.location = "#" + urls[urls.length - 1];
        }
    };

    var move_left = function () {
        if (current_offset >= 1) {
            var urls = pages_list[--current_offset].urls;
            window.location = "#" + urls[urls.length - 1];
        }
    };

    var MouseWheelHandler = function (e) {
        // cross-browser wheel delta
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
        if (delta > 0) {
            move_left();
        } else {
            move_right();
        }
    };

    var register_events = function () {
        $(document).keydown(function (e) {
            console.log(e.keyCode);
            console.log(pages_list, current_offset, pages_list[parseInt(current_offset) + 1]);

            if (e.keyCode == 37) {
                move_left();
            }
            if (e.keyCode == 39) {
                move_right();
            }
        });

        if (document.addEventListener) {
            // IE9, Chrome, Safari, Opera
            document.addEventListener("mousewheel", MouseWheelHandler, false);
            // Firefox
            document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        } else {
            document.attachEvent("onmousewheel", MouseWheelHandler);
        }

        $(".slide").click(function () {
            if (!$(this).hasClass("active")) {
                window.location = $(this).attr("data-url");
            }
        });
    };

    var init = function () {
        //active and stuff

        for (var k in pages_list) {
            var page = pages_list[k];

            (function (page, k) {
                for (var j in page.urls) {
                    var url = page.urls[j];
                    console.log(url);
                    router.route(url, function () {
                        $("title").html("MTI : " + page.name);
                        header.find(".active").removeClass("active");
                        header.find("." + page.class).addClass("active");
                        header.find(".text." + page.baseclass).addClass("active");
                        if (hash != "#" + url || (hash != "#presentation" && hash != "#" && hash != "")) {
                            $(".slide").addClass("moving");
                        }

                        $("#slides_container").stop();
                        $("#slides_container").animate({
                            left:-(k * 990)
                        }, 1000, "swing", function () {
                            $(".slide").removeClass("moving");
                        });
                        hash = null;
                        current_offset = k;
                        $(".slide").removeClass("active");
                        $(".slide." + page.class).addClass("active");
                    });
                }

                var div = $(document.createElement("div"));
                div.css("background", page.background);
                div.addClass("slide");
                div.addClass(page.class);
                div.attr("data-url", "#" + page.urls[page.urls.length - 1]);
                if (page.content) {
                    $.ajax({
                        url:"/templates/" + page.content,
                        success:function (data, status) {
                            var xml = $($.parseHTML(data));
                            div.html(xml.find('div[id="content"]'));
                        }
                    });
                }

                $("#slides").css("width", $("#slides").width() + 1040);
                $("#slides_container").append(div);
            })(page, k);

        }
        $("#slides_container").append('<div class="clearer"></div>')
        Backbone.history.start();


        register_events();
    };

    return {
        init:init
    };
});