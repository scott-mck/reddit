window.Reddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // sponsored post
    if (window.location.pathname.indexOf('/r/') === -1) {
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
    }

    // trending subreddits
    if (window.location.pathname === '/') {
      $('#sponsored').after('<div id="trending-subreddits">');
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

    // main posts
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
          var clearDiv = $("<div style='clear: left;'>");
          $('#posts').append(view.render().$el).append(clearDiv);
        });
      }
    });

    // advertisement (sidebar)
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
  }
};

$(document).ready(function(){
  Reddit.initialize();
});
