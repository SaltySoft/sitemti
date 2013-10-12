var sb_paths = {
    jquery:"lib/jquery",
    underscore:"lib/underscore",
    backbone:"lib/backbone",
    text:"lib/text",
    pageslist:"resources/pageslist",
    carousel:"carousel",
    SiteMTI:"SiteMTI"
};

var sb_shim = {
    'underscore':{
        exports:'_'
    },
    'backbone':{
        deps:['jquery', 'underscore'],
        exports:'Backbone'
    },
    'carousel':{
        deps:['jquery', 'underscore', 'backbone', 'text']
    }
};