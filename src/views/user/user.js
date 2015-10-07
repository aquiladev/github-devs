RAD.view('view.user', RAD.Blanks.ScrollableView.extend({
  	url: 'src/views/user/user.html',
    onInitialize: function () {
  		  this.model = RAD.model('user');
  	}
}));
