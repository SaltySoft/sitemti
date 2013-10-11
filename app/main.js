requirejs.config({
    baseUrl: 'app',
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone'
    },
    shim: {
        'backbone': {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        }
    }
});

requirejs(["jquery", 'boot'], function ($, boot) {
    boot.init();
});