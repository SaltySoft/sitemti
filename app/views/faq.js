define([
    'jquery',
    'underscore',
    'backbone',
    'carousel',
    'text!/templates/faq/faq.html',
    'text!/templates/faq/faq_items.html',
    'text!/templates/faq/faqTemplate1.html',
    'text!/templates/faq/faqTemplate2.html',
    'text!/templates/faq/faqTemplate3.html'
], function ($, _, Backbone, Carousel, faqTemplate, faqItems, faqTemplate1, faqTemplate2, faqTemplate3) {
    var View = Backbone.View.extend({
        tagName:"div",
        className:"slide",
        initialize:function () {
            var base = this;
        },
        init:function (page) {
            var base = this;
            base.page = page;

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
            console.log("hauteur carousel faq1", base.$el.height());
            var templates_list = [];
            console.log("1");
            if (base.$el.height() < 650) {
                div.addClass("faq-container");
                div.addClass("two-elements");
                console.log("LESS THAN 650");
                $(faqItems).children('.faq-question-container').each(function () {
                    console.log("this");
                });
                var faq_items_list = $(faqItems).find(".faq-question-container");
                console.log("faq_items_list", faq_items_list);
                var counter = 1;
                for (var k in faq_items_list) {
                    if (counter == 1) {
                        faq_template.find(".faq-column1").html(faq_items_list[k].html());
                        var template = _.template(faq_template, {
                        });
                        templates_list.push(template);
                        counter++;
                    }
                    if (counter == 2) {
                        $(templates_list[templates_list.length - 1]).find(".faq-column2").html(faq_items_list[k].html());
                        counter = 1;
                    }
                }
            }
            else {
                div.addClass("faq-container");
                div.addClass("three-elements");
                templates_list = [faqTemplate1, faqTemplate2, faqTemplate3];
            }

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
                    base.trigger('resizeFaqEnd');
                }, 400);
            });

            base.bind('resizeFaqEnd', function () {
                //resizing stuff
                console.log("hauteur carousel faq", base.$el.height());
                if (base.$el.height() < 650) {
                    base.renderCarousel();
                }
                else {
                    base.renderCarousel();
                }
            });
        }
    });

    return View;
});