define(['backbone'], function (Backbone) {

    var Config = new Backbone.Model({
        baseUrl: 'http://localhost:8080/',
        version: '1'

    });
    return Config;
});
