define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/carousel/carousel.html',
    'text!/templates/carousel/carouselVertical.html'
], function ($, _, Backbone, carouselTemplate, verticalCarouselTemplate) {
    var View = Backbone.View.extend({
        tagName:"div",
        className:"carousel",
        initialize:function () {
            var base = this;
        },
        init:function (template_list, vertical) {
            var base = this;
            base.index = 1;
            base.template_list = template_list;

            if (vertical) {
                base.vertical = true;
            }
            else {
                base.vertical = false;
            }

            base.render();
            base.registerEvents();
        },
        render:function () {
            var base = this;

            if (base.vertical) {
                var template = _.template(verticalCarouselTemplate, {
                });
            }
            else {
                var template = _.template(carouselTemplate, {
                });
            }
            base.$el.html(template);
            base.renderTemplates();
        },
        renderTemplates:function () {
            var base = this;
            base.$el.find(".carousel-inner-content").html("");
            base.$el.find(".carousel-index-indicators").html("");
            for (var k in base.template_list) {
                //carousel-index-indicators
                var li = $(document.createElement("li"));
                li.attr("data-slide-to", k);
                if (k == 0) {
                    li.addClass("active");
                }
                base.$el.find(".carousel-index-indicators").append(li);

                //carousel-inner-content
                var div = $(document.createElement("div"));
                div.addClass("item");
                if (k == 0) {
                    div.addClass("active");
                }
                div.attr("index", k);
                var template = _.template(base.template_list[k], {
                });
                div.html(template);
                base.$el.find(".carousel-inner-content").append(div);
            }
        },
        getActiveIndex:function () {
            var base = this;
            var active_item = base.$el.find(".item.active");
            var index = ($(active_item).parent().children()).index(active_item);
            var index2 = active_item.attr("index");
            console.log("index", index);
            console.log("index2", index2);
            base.index = index2;
//            return index2;
        },
        slideTo:function (position) {

        },
        next:function () {

        },
        previous:function () {

        },
        registerEvents:function () {
            var base = this;

            base.$el.delegate(".carousel-control", "click", function () {
                var elt = $(this);
                if (elt.attr("data-slide") == "prev") {
                    console.log("carousel-control PREV");
                }
                if (elt.attr("data-slide") == "next") {
                    console.log("carousel-control NEXT");
                }
            });
            base.$el.delegate(".carousel-index-indicators li", "click", function () {
                var elt = $(this);
                var slideTo = elt.attr("data-slide-to");
                console.log(".carousel-index-indicators li ", slideTo);
            });

        }
    });

    return View;
});