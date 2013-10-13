requirejs.config({
    baseUrl:'app',
    paths:sb_paths,
    shim:sb_shim
});

var apps = [
    "jquery",
    "underscore",
    "backbone",
    "SiteMTI"
];

$(document).ready(function () {
    requirejs(apps, function ($, _, Backbone, SiteMTI) {
        SiteMTI.init();
    });
});
