// TODO: possibly move logic to backbone views

//= require jquery
//= require jquery_ujs
//= require jquery.serializejson
//= require jquery.timeago
//= require jquery.ajax-cross-origin.min
//= require underscore
//= require backbone
//= require composite_view
//= require reddit
//= require_tree ../templates
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree .

$(document).ready(function() {
  $(document).mouseup(function (event) {
    var mySubreddits = $('.my-subreddits');
    var container = $('.my-subreddits-dropdown');

    if (!container.is(event.target) && !mySubreddits.is(event.target) &&
          container.has(event.target).length === 0) {
      container.css('display', 'none');
    }
  });

  $('#random').click(function () {
    $.ajax({
      url: 'https://www.reddit.com/r/random.json',
      dataType: 'jsonp',
      jsonp: 'jsonp',
      success: function (resp) {
        var sub = resp.data.children[0].data.subreddit;
        window.location = '/r/' + sub;  
      }
    })
  });

  $('.my-subreddits').click(function () {
    if ($('.my-subreddits-dropdown').css('display') === 'none') {
      $('.my-subreddits-dropdown').css('display', 'block');
    } else {
      $('.my-subreddits-dropdown').css('display', 'none');
    }
  });

  $('.gold-container').mouseenter(function () {
    if (window.goldHideId) {
      clearTimeout(window.goldHideId);
    }
    window.goldShowId = setTimeout(function (){
      $('.gold-dropdown').css('visibility', 'visible');
      $('.gold-dropdown').css('opacity', 1);
      $('.gold-dropdown').css('margin-top', '5px');
    }, 200);
  });

  $('.gold-container').mouseleave(function () {
    if (window.goldShowId) {
      clearTimeout(window.goldShowId);
    }
    window.goldHideId = setTimeout(function () {
      $('.gold-dropdown').css('visibility', 'hidden');
      $('.gold-dropdown').css('opacity', 0);
      $('.gold-dropdown').css('margin-top', '0px');
    }, 800);
  });
});
