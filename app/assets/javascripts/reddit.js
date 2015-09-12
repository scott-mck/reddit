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

    // trending subreddits TODO: make this page-specific
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
          $('#sponsored').after(view.render().$el);
        }
      });
    }

    // main posts
    var posts = new Reddit.Collections.Posts();
    posts.fetch({
      url: 'https://www.reddit.com'
            + window.location.pathname
            + '.json'
            + window.location.search,
      dataType: 'jsonp',
      jsonp: 'jsonp',
      success: function (collection, resp) {
        var count = window.location.search.match(/count=(\d+)/) || 0;
        if (count) {
          count = count[1];
        }
        count = parseInt(count);
        
        posts.each(function (post) {
           view = new Reddit.Views.PostsIndexItem({
            model: post,
            index: count + posts.indexOf(post) + 1
          });
          var clearDiv = $("<div style='clear: left;'>");
          $('#posts').append(view.render().$el).append(clearDiv);
        });

        var view = new Reddit.Views.ViewMore({
          after: resp.data.after,
          before: resp.data.before
        });
        $('#main').append(view.render().$el);
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
