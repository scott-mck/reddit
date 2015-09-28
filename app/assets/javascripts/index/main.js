//= require_tree .

var posts = new Reddit.Collections.Posts();
posts.fetch({
  url: 'https://www.reddit.com'
        + window.location.pathname
        + '.json'
        + window.location.search,
  dataType: 'jsonp',
  jsonp: 'jsonp',
  success: function (collection, resp) {
    // TODO: there HAS to be a better way to do this
    var count = window.location.search.match(/count=(\d+)/);
    if (count) {
      count = parseInt(count[count.length - 1]);
    }
    var dir = window.location.search.match(/(after|before)=\w+/) || [''];

    var countAfter, countBefore;
    var getIndex = function (n) {
      return count + n + 1;
    }
    if (dir[dir.length - 1] === 'after') {
      countAfter = count + 25;
      countBefore = count + 1;
    } else if (dir[dir.length - 1] === 'before') {
      countAfter = count - 1;
      countBefore = count - 25;
      getIndex = function (n) {
        return count - (25 - n);
      };
    } else {
      countAfter = 25;
    }

    posts.each(function (post) {
       view = new Reddit.Views.PostsIndexItem({
        model: post,
        index: getIndex(posts.indexOf(post))
      });
      var clearDiv = $("<div style='clear: left;'>");
      $('#posts').append(view.render().$el).append(clearDiv);
    });

    var view = new Reddit.Views.ViewMore({
      after: resp.data.after,
      before: resp.data.before,
      countAfter: countAfter,
      countBefore: countBefore
    });
    $('#main').append(view.render().$el);
  }
});
