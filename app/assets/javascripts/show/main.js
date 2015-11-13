//= require_tree .

var comments = new Reddit.Collections.Comments();
comments.fetch({
  url: 'https://www.reddit.com'
        + window.location.pathname
        + '.json'
        + window.location.search,
  dataType: 'jsonp',
  jsonp: 'jsonp',
  success: function (collection, resp) {
    var selectedPostData = resp[0].data.children[0];
    var postModel = new Reddit.Models.Post(selectedPostData);

    var selectedPost = new Reddit.Views.PostsIndexItem({
      model: postModel
    });
    $('#post').append(selectedPost.render().$el);

    var commentsSort = new Reddit.Views.CommentsSort({
      numComments: _.last(resp[1].data.children).data.count
    });
    $('#comments-sort').append(commentsSort.render().$el);

    resp[1].data.children.forEach(function (commentData) {
      var comment = new Reddit.Models.Comment(commentData);
      var view = new Reddit.Views.CommentsIndexItem({
        op: postModel.get('data').author,
        model: comment,
        index: 0
      });
      $('#comments').append(view.render().$el);
    });
  }
});
