(function () {
    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'home': 'home',
            'search/:value': 'search',
            '*actions': 'home'
        },
        home: function () {
            RAD.core.publish('navigation.show', {
                container_id: '.view-holder',
                content: 'view.home'
            });
        },
        search: function(value){
            console.log(value);
            // RAD.core.publish('navigation.show', {
            //     container_id: '.view-holder',
            //     content: 'view.search'
            // });
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
