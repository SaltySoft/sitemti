define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/menu_slide/menu_slide.html'
], function ($, _, Backbone, menu_slide_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "menu_slide",
        initialize: function () {
            var base = this;
            base.content = [];
        },
        init: function (page_title) {
            var base = this;

            base.render();
            base.$el.find(".page_title").html(page_title);
            base.registerEvents();
        },
        add_content: function(name, content) {
            var base = this;

            base.content.push(content[0]);
            var button = $(document.createElement("li"));
            button.addClass("menu_button");
            button.attr("data-index", base.content.length - 1);
            button.html('<a href="javascript:void(0);">' + name + '</a>');


            base.$el.find(".menu_list").append(button);
            if (base.content.length == 1) {
                base.$el.find(".menu_slide_content").html(base.content[0]);
//                console.log(base.content);
                button.find("a").addClass("selected");
                Hyphenator.run();
            }
        },
        render: function () {
            var base = this;

            var template = _.template(menu_slide_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate(".menu_button a", "click", function () {
                var elt = $(this);
                base.$el.find(".selected").removeClass("selected");
                elt.addClass("selected");
                base.$el.find(".menu_slide_content").html(base.content[elt.parent().attr("data-index")]);
//                console.log(elt.parent().attr("data-index"), base.content);
                Hyphenator.run();
            });
        }
    });

    return View;
});