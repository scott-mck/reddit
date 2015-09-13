$.ajax({
  url: 'https://www.reddit.com/r/ads/.json',
  dataType: 'jsonp',
  jsonp: 'jsonp',
  success: function (ad) {
    var view = new Reddit.Views.Ad({
      model: ad.data.children[0]
    });
    $('#sidebar .ad').append(view.render().$el);
  }
});
