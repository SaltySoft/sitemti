define([
    'jquery',
    'underscore',
    'backbone',
    'carousel',
    'text!/templates/faq/faqTemplate1.html',
    'text!/templates/faq/faqTemplate2.html',
    'text!/templates/faq/faqTemplate3.html'
], function ($, _, Backbone, Carousel, faqTemplate1, faqTemplate2, faqTemplate3) {
    var View = Backbone.View.extend({
        tagName:"div",
        className:"slide",
        initialize:function () {
            var base = this;
        },
        init:function (page) {
            var base = this;
            base.page = page;
            //            base.render();
            base.renderCarousel();

            base.registerEvents();
        },
        render:function () {
            var base = this;
            base.$el.css("background", base.page.background);
            base.$el.addClass(base.page.class);
            base.$el.attr("data-url", "#" + base.page.urls[base.page.urls.length - 1]);

            var template = _.template(faq1Template, {
            });
            base.$el.html(template);
        },
        renderCarousel:function () {
            var base = this;
            base.$el.css("background", base.page.background);
            base.$el.addClass(base.page.class);
            base.$el.attr("data-url", "#" + base.page.urls[base.page.urls.length - 1]);

            var div = $(document.createElement("div"));
            div.addClass("faq-container");

            var templates_list = [faqTemplate1, faqTemplate2, faqTemplate3];

            base.carousel = new Carousel();
            div.html(base.carousel.$el);
            base.$el.html(div);
            base.carousel.init(templates_list, true, true);
//            base.addHeightPadding();
        },
        registerEvents:function () {
            var base = this;
        }
    });

    return View;
});