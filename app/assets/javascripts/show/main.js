//= require_tree .

var comments = new Reddit.Collections.Comments();
comments.fetch({
  url: 'https://www.reddit.com'
        + window.location.pathname
        + '.json',
  dataType: 'jsonp',
  jsonp: 'jsonp',
  success: function (collection, resp) {
    debugger
    var selectedPost;
    // comments.each(function (post) {
    //    view = new Reddit.Views.PostsIndexItem({
    //     model: post,
    //     index: getIndex(comments.indexOf(post))
    //   });
    //   $('#comments').append(view.render().$el);
    // });
  }
});
