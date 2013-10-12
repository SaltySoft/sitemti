define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/débouchés/debouchesTemplate.html'
], function ($, _, Backbone, debouchesTemplate) {
    var View = Backbone.View.extend({
        tagName:"div",
        className:"slide",
        initialize:function () {
            var base = this;
        },
        init:function (page) {
            var base = this;
            base.page = page;
            base.render();
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
        registerEvents:function () {
            var base = this;
        }
    });

    return View;
});