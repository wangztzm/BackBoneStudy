// Require.js Configurations
// -------------------------
require.config({

    // Sets the js folder as the base directory for all future relative paths
    baseUrl: "./js",

    map: {
        '*': {
            'css': 'libs/plugins/css.min'
        }
    },

    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths: {

        // Core Libraries
        // --------------
        "jquery": "libs/jquery-3.2.1.min",

        "jqueryui": "libs/jqueryui",

        "underscore": "libs/underscore-min",

        "backbone": "libs/backbone-min",

        // Plugins
        // -------
        "bootstrap": "libs/plugins/bootstrap",

        "text": "libs/plugins/text",

        "jqueryConfirm": "libs/plugins/jquery-confirm.min",

        //自定义
        "config": "app/common/Config",

        "store": "app/common/Store",

        "client": "app/common/Client",

        "utils": "app/common/Utils",

        "zh-cn": "app/lang/zh-cn",

        "en-us": "app/lang/en-us",
    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        // Twitter Bootstrap jQuery plugins
        "bootstrap": ["jquery"],

        // jQueryUI
        "jqueryui": ["jquery"],

        "jqueryConfirm": ["jquery"],

    }

});

require(["jquery", "backbone", "app/routers/DesktopRouter", "client", "utils", "store"],

    function ($, Backbone, DesktopRouter, Client, Utils, Store) {

        Client.initialize();
        Utils.setLang(Store);
        // Instantiates a new Desktop Router instance
        Utils.setRouter(new DesktopRouter());
    }
);