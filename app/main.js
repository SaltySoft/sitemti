require.config({
    baseUrl: 'app',
    paths: {
        jquery: 'lib/jquery'
    }
});

require(["jquery", 'boot'], function ($, boot) {
    boot.init();
});