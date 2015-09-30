$.ajax({
  url: 'https://reddit.com/r/trendingsubreddits.json',
  dataType: 'jsonp',
  jsonp: 'jsonp',
  success: function (trending) {
    var trendingPost = trending.data.children[0].data;
    var regEx = /\/r\/\w*/g;
    var subs = trendingPost.title.match(regEx);

    var view = new Reddit.Views.TrendingSubreddits({
      subs: subs,
      numComments: trendingPost.num_comments,
      permalink: trendingPost.permalink
    });
    $('#sponsored-outer').after(view.render().$el);
  }
});
