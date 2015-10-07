(function () {
    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'home': 'home',
            'user/:value': 'user',
            // '*actions': 'home'
        },
        home: function () {
            RAD.core.publish('navigation.show', {
                container_id: '.view-holder',
                content: 'view.home'
            });
        },
        user: function(value) {
            RAD.model('user').fetch({
                success: function() {
                    RAD.core.publish('navigation.show', {
                        container_id: '.view-holder',
                        content: 'view.user'
                    });
                },
                q: value
            });
        }
    });

    RAD.service('service.router', RAD.Blanks.Service.extend({
        onInitialize: function () {
            this.subscribe('back', this.back, this);
            this.router = new Router();
            Backbone.history.start();
        }
    }));
})();
