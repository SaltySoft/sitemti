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
                var elt = $('<div>' + faqItems + '</div>').filter(".faq-question-container");
                var counter = 1;
                elt.each(function () {
                    var elt = $(this);
                    if (counter == 1) {
                        var faq_template = _.template(faqTemplate, {
                        });
                        var tpl = $(faq_template);
                        tpl.find(".faq-column1").html(elt.html());
                        templates_list.push(tpl);
                        counter++;
                    }
                    if (counter == 2) {
                        $(templates_list[templates_list.length - 1]).find(".faq-column2").html(elt.html());
                        counter = 1;
                    }
                });
            }
            else {
                div.addClass("faq-container");
                div.addClass("three-elements");
                templates_list = [faqTemplate1, faqTemplate2, faqTemplate3];
            }

            console.log("templates_list1", templates_list);
            var templates_list2 = [faqTemplate1, faqTemplate2, faqTemplate3];
            console.log("templates_list2", templates_list2);

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