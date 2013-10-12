var sb_paths = {
    jquery:"lib/jquery",
    underscore:"lib/underscore",
    backbone:"lib/backbone",
    text: "lib/text",
    pageslist:"resources/pageslist",
    SiteMTI:"SiteMTI"
};

var sb_shim = {
    'underscore':{
        exports:'_'
    },
    'backbone':{
        deps:['jquery', 'underscore'],
        exports:'Backbone'
    }
};