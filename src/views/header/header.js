RAD.view('view.header', RAD.Blanks.View.extend({
  	url: 'src/views/header/header.html',
    events: {
        'keypress #login': 'enter',
        'click #search-btn': 'search'
  	},
    enter: function(e){
        if(e.keyCode == 13){
            e.preventDefault();
            this.search(e);
        }
    },
    search: function(e){
        e.stopPropagation();
        var value = encodeURIComponent($('#login').val());
        var service = RAD.core.getService('service.router');

        var isTrigger = true;
        if(Backbone.history.getFragment().indexOf('user/') > -1) {
            RAD.model('user').fetch({q: value});
            isTrigger = false;
        }
        service.router.navigate('user/' + value, { trigger: isTrigger });
    }
}));
