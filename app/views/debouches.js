define([
    'jquery',
    'underscore',
    'backbone',
    'carousel',
    'text!/templates/débouchés/debouchesTemplate.html',
    'text!/templates/débouchés/debouchesSplit1.html',
    'text!/templates/débouchés/debouchesSplit2.html'
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
//            base.render();s
            base.renderSplit();

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
            var carousel = new Carousel();
            carousel.init(templates_list, true);

            div.html(carousel.$el);
            base.$el.html(div);
        },
        registerEvents:function () {
            var base = this;
        }
    });

    return View;
});