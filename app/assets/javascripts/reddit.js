window.Reddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var posts = new Reddit.Collections.Posts();
    posts.fetch({
      url: 'https://www.reddit.com/.json',
      success: function () {
        posts.each(function (post) {
           view = new Reddit.Views.PostsIndexItem({
            model: post,
            index: posts.indexOf(post)
          });
          $('.posts').append(view.render().$el);
        });
      }
    })
  }
};

$(document).ready(function(){
  Reddit.initialize();
});
