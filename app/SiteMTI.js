var apps = [
    'jquery',
    'underscore',
    'backbone',
    'pageslist'
];

define(apps, function ($, _, Backbone, pages_list) {

    var SiteMTI = {
        boot:function () {
            console.log(Backbone);
            SiteMTI.header = $("#header");

            SiteMTI.Router = Backbone.Router.extend({
                routes:{

                }
            });
            SiteMTI.router = new SiteMTI.Router();
            SiteMTI.hash = window.location.hash;
            SiteMTI.current_offset = 0;

            SiteMTI.move_right = function () {
                if (SiteMTI.current_offset < pages_list.length - 1) {
                    var urls = pages_list[++SiteMTI.current_offset].urls;
                    window.location = "#" + urls[urls.length - 1];
                }
            };

            SiteMTI.move_left = function () {
                if (SiteMTI.current_offset >= 1) {
                    var urls = pages_list[--SiteMTI.current_offset].urls;
                    window.location = "#" + urls[urls.length - 1];
                }
            };

            SiteMTI.MouseWheelHandler = function (e) {
                // cross-browser wheel delta
                var e = window.event || e;
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
                if (delta > 0) {
                    SiteMTI.move_left();
                } else {
                    SiteMTI.move_right();
                }
            };

            SiteMTI.register_events = function () {
                $(document).keydown(function (e) {
                    console.log(e.keyCode);
                    console.log(pages_list, SiteMTI.current_offset, pages_list[parseInt(SiteMTI.current_offset) + 1]);

                    if (e.keyCode == 37) {
                        SiteMTI.move_left();
                    }
                    if (e.keyCode == 39) {
                        SiteMTI.move_right();
                    }
                });

                if (document.addEventListener) {
                    // IE9, Chrome, Safari, Opera
                    document.addEventListener("mousewheel", SiteMTI.MouseWheelHandler, false);
                    // Firefox
                    document.addEventListener("DOMMouseScroll", SiteMTI.MouseWheelHandler, false);
                } else {
                    document.attachEvent("onmousewheel", SiteMTI.MouseWheelHandler);
                }

                $(".slide").click(function () {
                    if (!$(this).hasClass("active")) {
                        window.location = $(this).attr("data-url");
                    }
                });
            };
        },
        init:function () {
            SiteMTI.boot();
            //active and stuff
            for (var k in pages_list) {
                var page = pages_list[k];

                (function (page, k) {
                    for (var j in page.urls) {
                        var url = page.urls[j];
                        console.log(url);
                        SiteMTI.router.route(url, function () {
                            $("title").html("MTI : " + page.name);
                            SiteMTI.header.find(".active").removeClass("active");
                            SiteMTI.header.find("." + page.class).addClass("active");
                            SiteMTI.header.find(".text." + page.baseclass).addClass("active");
                            if (SiteMTI.hash != "#" + url ||
                                (SiteMTI.hash != "#presentation" && SiteMTI.hash != "#" && SiteMTI.hash != "")) {
                                $(".slide").addClass("moving");
                            }

                            $("#slides_container").stop();
                            $("#slides_container").animate({
                                left:-(k * 990)
                            }, 1000, "swing", function () {
                                $(".slide").removeClass("moving");
                            });
                            SiteMTI.hash = null;
                            SiteMTI.current_offset = k;
                            $(".slide").removeClass("active");
                            $(".slide." + page.class).addClass("active");
                        });
                    }

                    if (page.view) {
                        var view = page.getView();
                        $("#slides").css("width", $("#slides").width() + 1040);
                        $("#slides_container").append(view.$el);
                        view.init(page);
                    }
                    else {
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
                    }
                })(page, k);

            }
            $("#slides_container").append('<div class="clearer"></div>')
            Backbone.history.start();

            SiteMTI.register_events();
        }
    };

    return SiteMTI;
});