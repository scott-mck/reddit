//= require_tree .

var comments = new Reddit.Collections.Comments();
comments.fetch({
  url: 'https://www.reddit.com'
        + window.location.pathname
        + '.json',
  dataType: 'jsonp',
  jsonp: 'jsonp',
  success: function (collection, resp) {
    var selectedPostData = resp[0].data.children[0];
    var postModel = new Reddit.Models.Post(selectedPostData);

    var view = new Reddit.Views.PostsIndexItem({
      model: postModel
    });

    $('#post').append(view.render().$el);
  }
});
