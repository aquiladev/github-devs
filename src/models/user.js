RAD.model('user', Backbone.Model.extend({
    url: '',
    fetch: function (options) {
        var self = this;
        var octo = new Octokat();
        var cb = function(err, val) {
            console.log(val);
        };
        octo.zen.read(cb);
        octo.users(options.q)
            .fetch(function(error, data) {
                if(error) {
                    self.models = [];
                    return;
                }

                self.clear().set(data);
                if(options.success) {
                    options.success(data, options);
                }
            });
    }
}));
