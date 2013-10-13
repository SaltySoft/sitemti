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
        init:function (template_list, vertical, transitional) {
            var base = this;
            base.index = 0;
            base.template_list = template_list;
            base.maxIndex = base.template_list.length;

            if (vertical) {
                base.vertical = true;
            }
            else {
                base.vertical = false;
            }
            if (transitional) {
                base.transitional = true;
            }
            else {
                base.transitional = false;
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
            base.renderElements();
        },
        renderElements:function () {
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
                var cic = base.$el.find(".carousel-inner-content");
                var div = $(document.createElement("div"));
                if (base.transitional) {
                    div.addClass("itemTransitional");
                }
                else {
                    div.addClass("item");
                }
                if (k == 0) {
                    div.addClass("active");
                }
                div.attr("index", k);
                var template = _.template(base.template_list[k], {
                });
                div.html(template);

//CANT FIGURE WHY HEIGHT IS NOT ACCESSIBLE AT THIS LEVEL
//                var elt = $(div);
//                var height_carousel = parseInt($(base.$el).css("height"), 10);
//                var eltChildren = elt.children();
//                console.log("eltChildren", eltChildren);
//                if (eltChildren.length > 0) {
//                    var firstChild = elt.children(":first");
//                    var firstChild_height = parseInt(firstChild.css("height"), 10);
//                    console.log("firstChild_height", firstChild_height);
//                    console.log("height_carousel", height_carousel);
//                    elt.css("padding-top", (height_carousel - firstChild_height) / 2);
//                }
                cic.append(div);
            }
        },
        getActiveIndex:function () {
            var base = this;
            var active_item = base.$el.find(".item.active");
            var index = ($(active_item).parent().children()).index(active_item);
            var index2 = active_item.attr("index");
            console.log("index", index);
            console.log("index2", index2);

            return index2;
        },
        slideTo:function (position) {
            var base = this;
            var cic = base.$el.find(".carousel-inner-content");
            var items = $(cic).children();
            var indicators = $(base.$el.find(".carousel-index-indicators")).children();
            var height_carousel = parseInt($(base.$el).css("height"), 10);

            items.each(function () {
                var elt = $(this);
                elt.css("height", height_carousel);
                if (elt.attr("index") == position) {
                    elt.addClass("active");
                } else {
                    elt.removeClass("active");
                }
            });
            if (base.transitional) {
                $(cic).css("height", height_carousel * base.template_list.length);
                $(cic).animate({
                    top:-(position * height_carousel)
                }, 1000, "swing", function () {
                });
            }
            indicators.each(function () {
                var elt = $(this);
                if (elt.attr("data-slide-to") == position) {
                    elt.addClass("active");
                } else {
                    elt.removeClass("active");
                }
            });
            base.index = position;
        },
        next:function () {
            var base = this;
            var newIndex = base.index + 1;
            if (newIndex > base.maxIndex - 1) {
                newIndex = 0;
            }
            else {
                if (newIndex < 0) {
                    newIndex = base.maxIndex - 1;
                }
            }
            base.slideTo(newIndex);
        },
        previous:function () {
            var base = this;
            var newIndex = base.index - 1;
            if (newIndex > base.maxIndex - 1) {
                newIndex = 0;
            }
            else {
                if (newIndex < 0) {
                    newIndex = base.maxIndex - 1;
                }
            }
            base.slideTo(newIndex);
        },
        registerEvents:function () {
            var base = this;

            base.$el.delegate(".carousel-control", "click", function () {
                var elt = $(this);
                if (elt.attr("data-slide") == "prev") {
                    console.log("carousel-control PREV");
                    base.previous();
                }
                if (elt.attr("data-slide") == "next") {
                    console.log("carousel-control NEXT");
                    base.next();
                }

            });
            base.$el.delegate(".carousel-index-indicators li", "click", function () {
                var elt = $(this);
                var nb = elt.attr("data-slide-to");
                console.log(".carousel-index-indicators li ", nb);
                base.slideTo(nb);
            });

        }
    });

    return View;
});