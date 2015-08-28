window.Reddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var posts = new Reddit.Collections.Posts();
    posts.fetch({
      url: 'https://www.reddit.com' + window.location.pathname + '.json',
      dataType: 'jsonp',
      jsonp: 'jsonp',
      success: function (collection, resp) {
        posts.each(function (post) {
           view = new Reddit.Views.PostsIndexItem({
            model: post,
            index: posts.indexOf(post)
          });
          $('.posts').append(view.render().$el);
        });

        // change url to show fetched subreddit
        if (window.location.pathname === '/r/random') {
          window.history.pushState(
            "something",
            "Title",
            resp.data.children[0].data.subreddit
          );
        }
      },
    });
  }
};

$(document).ready(function(){
  Reddit.initialize();
});
