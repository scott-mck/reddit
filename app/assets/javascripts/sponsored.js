var sponsoredPosts = new Reddit.Collections.Posts();
sponsoredPosts.fetch({
  url: 'https://www.reddit.com/rising.json',
  dataType: 'jsonp',
  jsonp: 'jsonp',
  success: function () {
    view = new Reddit.Views.SponsoredPost({
      collection: sponsoredPosts.first(10),
      model: sponsoredPosts.first()
    });
    $('#sponsored').append(view.render().$el.addClass('sponsored'));
  }
});
