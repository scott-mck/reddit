$.ajax({
  url: 'https://www.reddit.com/r/ads/.json',
  dataType: 'jsonp',
  jsonp: 'jsonp',
  success: function (ad) {
    for (var i = 0; i < 25; i++) {
      var model = ad.data.children[i];
      if (model.data.preview) {
        var view = new Reddit.Views.Ad({
          model: ad.data.children[i]
        });
        $('#sidebar .ad').append(view.render().$el);
        return;
      }
    }
  }
});
