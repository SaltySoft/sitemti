var views = [
    '/app/views/debouches.js'
];

define(views,
    function (debouchesView) {
    var list = [
        {
            name:"Presentation",
            class:"presentation",
            baseclass:"presentation",
            urls:[
                "", "presentation"
            ],
            background:"#601a85",
            content:"presentation/presentation.html"
        },
        {
            name:"Cours",
            baseclass:"cours",
            class:"cours1",
            urls:[
                "cours-premier-semestre"
            ],
            left-menu:true,
            background:"#e9c500",
            content:"cours/cours-langage-technologies.html"
        },
        {
            name:"Cours second semestre",
            baseclass:"cours",
            class:"cours2",
            urls:[
                "cours-second-semestre"
            ],
            background:"#e9c500"
        },
        {
            name:"Projets généraux",
            baseclass:"projets",
            class:"projets1",
            urls:[
                "projets-generaux"
            ],
            subpages : [
                {name:".NET",
                    content: "projets/projets1.html"
                },
                {
                    name:"JavaScript",
                    content:"projets/projets2.html"
                },
                {
                    name:"JEE",
                    content:"projets/projets3.html"
                },
                {
                    name:"iOS",
                    content:"projets/projets4.html"
                },
                {
                    name:"Jeux Vidéo",
                    content : "projets/projets5.html"
                }
            ],
            left_menu:true,
            background:"#e59d01"
        },
        {
            name:"PLIC",
            baseclass:"projets",
            class:"projets2",
            urls:[
                "projets-plic"
            ],
            background:"#e59d01"
        },
        {
            name:"PFEE",
            baseclass:"projets",
            class:"projets3",
            urls:[
                "projets-pfee"
            ],
            background:"#e59d01",
            left_menu: true,
            subpages: [
                {
                    name: "Présentation",
                    content: "projets/pfee/presentation.html"
                },
                {
                    name: "Planning",
                    content: "projets/pfee/planning.html"
                },
                {
                    name: "Homeloc",
                    content : "projets/pfee/homeloc.html"
                },
                {
                    name: "L'Entremise",
                    content : "projets/pfee/entremise.html"
                },
                {
                    name: "La Place de l'Immobiler Pro",
                    content : "projets/pfee/place_immobilier.html"
                },
                {
                    name: "Daily Agri",
                    content : "projets/pfee/daily_agri.html"
                },
                {
                    name: "Virtuel City",
                    content : "projets/pfee/virtuel_city.html"
                },
                {
                    name: "Juricaf",
                    content : "projets/pfee/juricaf.html"
                },
                {
                    name: "Volley Me",
                    content : "projets/pfee/volley_me.html"
                },
                {
                    name: "Yakwala",
                    content : "projets/pfee/yakwala.html"
                },
                {
                    name: "D-Data Santé",
                    content : "projets/pfee/d_data_sante.html"
                },
                {
                    name: "Alerte Allergies",
                    content : "projets/pfee/alerte_allergies.html"
                },
                {
                    name: "OptiConso",
                    content : "projets/pfee/opti_conso.html"
                }


            ]
        },
        {
            name:"Débouchés",
            baseclass:"debouches",
            class:"debouches",
            urls:[
                "debouches"
            ],
            background:"#0372fc",
            view:debouchesView,
            getView:function () {
                return new debouchesView();
            },
            content:"débouchés/débouchés.html"
        },

        {
            name:"Professeurs",
            baseclass:"profs",
            class:"profs",
            urls:[
                "professeurs"
            ],
            background:"#f45b25"
        },
        {
            name:"Barbecue MTI",
            baseclass:"events",
            class:"events1",
            urls:[
                "events-barbecue"
            ],
            background:"#4fa429"
        },
        {
            name:"MS Day",
            baseclass:"events",
            class:"events2",
            urls:[
                "events-msday"
            ],
            background:"#4fa429"
        },
        {
            name:"MTI Days",
            baseclass:"events",
            class:"events3",
            urls:[
                "events-mtidays"
            ],
            background:"#4fa429"
        },
        {
            name:"FAQ",
            baseclass:"faq",
            class:"faq",
            urls:[
                "faq"
            ],
            background:"#d84999"
        }


    ];

    return list;
});