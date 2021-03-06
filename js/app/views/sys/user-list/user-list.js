// View.js
// -------
define(["jquery", "backbone", "client", "utils",
    "app/models/Model", "text!app/views/sys/user-list/user-list.html", "css!app/views/sys/user-list/user-list.css"],

    function ($, Backbone, Client, Utils, Model, template) {

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: "[data-role='page']",

            // View constructor
            initialize: function () {

                // Calls the view's render method
                this.render();

            },

            // View Event Handlers
            events: {
                "click #backBtn": "goBack",
            },

            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

                //http://localhost:8181/infoskyalp/admin?login

            },

            goBack: function () {
                Utils.getRouter().navigate("back/home", {trigger: true, replace: false});
            }

        });

        // Returns the View class
        return View;

    }
);