RAD.view('view.header', RAD.Blanks.View.extend({
  	url: 'src/views/header/header.html',
    events: {
        'keypress #search': 'enter',
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
        var value = $('#search').val();
        var service = RAD.core.getService('service.router');
        service.router.navigate('search/' + encodeURIComponent(value), { trigger: true });
    }
}));
