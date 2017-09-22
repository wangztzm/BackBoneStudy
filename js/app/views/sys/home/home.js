// View.js
// -------
define(["jquery", "backbone", "underscore", "client", "utils", "store",
    "app/models/Model", "text!app/views/sys/home/home.html", 'css!app/views/sys/home/home.css'],

    function ($, Backbone, _, Client, Utils, Store, Model, template) {

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: "[data-role='page']",

            // View constructor
            initialize: function () {

                // Calls the view's render method
                this.render();
                this.bind("reset", this.updateView);


            },

            // View Event Handlers
            events: {
                "click #userListBtn": "goUserList",
                "click #addUserBtn": "addUser",
                "click .user-delete": "deleteUser",
                "click .user-update": "updateUser",
            },

            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                this.initUserList();

                // Maintains chainability
                return this;

                //http://localhost:8181/infoskyalp/admin?login

            },


            initUserList: function () {
                Utils.showMessage();
                Client.findUser(null, function (rs) {
                    Utils.hideMessage();
                    if (rs && rs.data && rs.state == 1) {
                        var userList = rs.data.list;

                        var html = [];
                        _.each(userList, function(userItem){
                            html.push('<div class="row" style="border: 1px solid">');
                            html.push('    <div class="col-sm-4" style="border:1px solid #ddd;" id="no-' + userItem.id + '">' + userItem.id + '</div>');
                            html.push('    <input class="col-sm-4" style="border:1px solid #ddd;" id="name-' + userItem.id + '" type="text" value="' + userItem.name + '"/>');
                            html.push('    <div class="col-sm-4" style="border:1px solid #ddd;"><input type="button" class="user-delete" value="删除" id="del-' + userItem.id + '"/><input type="button" class="user-update" value="更新" id="update-' + userItem.id + '"/></div>');
                            html.push('</div>');
                        })

                        html = html.join('');
                        $('#userListHeader').after(html);
                    } else {
                        Utils.showAlert({content: '加载失败！'});
                    }
                });
            },

            goUserList: function () {
                this.undelegateEvents();
                Utils.getRouter().navigate("forward/user-list", {trigger: true, replace: false});
            },


            addUser: function () {
                var self = this;
                var userData = {
                    'name': $('#username').val(),
                };
                Client.addUser(userData, function (rs) {
                    if (rs && rs.data && rs.state == 1) {
                        var user = rs.data;
                        var html = [];
                        html.push('<div class="row" style="border: 1px solid">');
                        html.push('    <div class="col-sm-4" style="border:1px solid #ddd;" id="no-' + user.id + '">' + user.id + '</div>');
                        html.push('    <input class="col-sm-4" style="border:1px solid #ddd;" id="name-' + user.id + '" type="text" value="' + user.name + '"/>');
                        html.push('    <div class="col-sm-4" style="border:1px solid #ddd;"><input type="button" class="user-delete" value="删除" id="del-' + user.id + '"/><input type="button" class="user-update" value="更新" id="update-' + user.id + '"/></div>');
                        html.push('</div>');
                        html = html.join('');
                        $('#userListHeader').after(html);
                    } else {
                        Utils.showAlert({content: '新增失败！'});
                    }
                });
            },

            deleteUser: function (event) {
                var self = this;
                var userId = $(event.currentTarget).attr('id').replace('del-', "");
                var userData = {
                    'id': userId
                };
                Client.deleteUser(userData, function (rs) {
                    if (rs && rs.data && rs.state == 1) {
                        $(event.currentTarget).parent().parent().remove();
                    } else {
                        Utils.showAlert({content: '删除失败！'});
                    }
                });
            },

            updateUser: function (event) {
                var self = this;
                var userId = $(event.currentTarget).attr('id').replace('update-', "");
                var userData = {
                    'id': userId,
                    'name': $('#name-' + userId).val(),
                    'testList': [{'id': '1'},{"id": '2'}]
                };
                Client.updateUser(userData, function (rs) {
                    if (rs && rs.data && rs.state == 1) {
                        Utils.showAlert({content: '更新成功！'});
                    } else {
                        Utils.showAlert({content: '更新失败！'});
                    }
                });
            },

        });

        // Returns the View class
        return View;

    }
);