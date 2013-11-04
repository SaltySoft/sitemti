define([
    'jquery',
    'underscore',
    'backbone',
    'carousel',
    'text!/templates/debouches/debouchesTemplate.html',
    'text!/templates/debouches/debouchesSplit1.html',
    'text!/templates/debouches/debouchesSplit2.html'
], function ($, _, Backbone, Carousel, debouchesTemplate, debouchesSplit1, debouchesSplit2) {

    var View = Backbone.View.extend({
        tagName:"div",
        className:"slide",
        initialize:function () {
            var base = this;
        },
        init:function (page) {
            var base = this;
            base.page = page;

            console.log("hauteur carousel", base.$el.height());
            if (base.$el.height() < 650) {
                base.renderSplit();
            }
            else {
                base.render();
            }


            base.registerEvents();
        },
        render:function () {
            var base = this;
            base.$el.css("background", base.page.background);
            base.$el.addClass(base.page.class);
            base.$el.attr("data-url", "#" + base.page.urls[base.page.urls.length - 1]);

            var template = _.template(debouchesTemplate, {
            });
            base.$el.html(template);
        },
        renderSplit:function () {
            var base = this;
            base.$el.css("background", base.page.background);
            base.$el.addClass(base.page.class);
            base.$el.attr("data-url", "#" + base.page.urls[base.page.urls.length - 1]);

            var div = $(document.createElement("div"));
            div.addClass("debouches-container");

            var templates_list = [debouchesSplit1, debouchesSplit2];
            base.carousel = new Carousel();
            div.html(base.carousel.$el);

            base.$el.html(div);
            base.carousel.init(templates_list, true, true);
        },
        registerEvents:function () {
            var base = this;

            $(window).resize(function () {
                if (base.resizeTO) {
                    clearTimeout(base.resizeTO);
                }
                base.resizeTO = setTimeout(function () {
                    base.trigger('resizeDebouchesEnd');
                }, 400);
            });

            base.bind('resizeDebouchesEnd', function () {
                //resizing stuff
                console.log("hauteur carousel", base.$el.height());
                if (base.$el.height() < 650) {
                    base.renderSplit();
                }
                else {
                    base.render();
                }
            });
        }
    });

    return View;
});