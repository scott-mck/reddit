window.Reddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // sponsored post TODO: make this page specific
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

    // main posts TODO: make this page-specific
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
