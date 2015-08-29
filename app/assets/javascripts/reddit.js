window.Reddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    if (window.location.pathname.indexOf('/r/') === -1) {
      var sponsoredPost = new Reddit.Collections.Posts();
      sponsoredPost.fetch({
        url: 'https://www.reddit.com/rising.json',
        dataType: 'jsonp',
        jsonp: 'jsonp',
        success: function () {
          view = new Reddit.Views.PostsIndexItem({
            model: sponsoredPost.first(),
          });
          $('#sponsored').prepend(view.render().$el.addClass('sponsored'));
        }
      });
    }

    if (window.location.pathname === '/') {
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
          $('#trending-subreddits').append(view.render().$el);
        }
      });
    }

    var posts = new Reddit.Collections.Posts();
    posts.fetch({
      url: 'https://www.reddit.com' + window.location.pathname + '.json',
      dataType: 'jsonp',
      jsonp: 'jsonp',
      success: function (collection, resp) {
        posts.each(function (post) {
           view = new Reddit.Views.PostsIndexItem({
            model: post,
            index: posts.indexOf(post) + 1
          });
          $('.posts').append(view.render().$el);
        });

        // change url from /r/random to the fetched subreddit
        if (window.location.pathname === '/r/random') {
          window.history.pushState(
            "something",
            "Title",
            resp.data.children[0].data.subreddit
          );
        }
      }
    });
  }
};

$(document).ready(function(){
  Reddit.initialize();
});
