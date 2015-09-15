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
//= require sponsored
//= require get_ad

function showLoginModal () {
  var backdrop = $('<div>');
  var login = new Reddit.Views.LoginModal({
    backdrop: backdrop
  });

  backdrop.click(function () {
    login.$el.removeClass('login-transition');
    login.$el.one('transitionend', function () {
      login.remove();

      backdrop.addClass('fade-out');
      backdrop.on('transitionend', function () {
        backdrop.remove();
      });
    });
  });

  $('body').prepend(backdrop);

  setTimeout(function () {
    backdrop.addClass('backdrop');
    backdrop.one('transitionend', function () {
      $('body').prepend(login.render().$el);
      setTimeout(function () {
        login.$el.addClass('login-transition');
      }, 0);
    });
  }, 0);
}

$(document).ready(function() {
  $(document).mouseup(function (e) {
    var $event = $(e.target);

    // clickDiv keys are showing or hiding divs
    // values are the corresponding shown or hidden divs
    var clickDivs = {
      'my-subreddits': '.my-subreddits-dropdown',
      'time-list': '.time-dropdown'
    };

    /* hide all clickDivs values on click, unless $event or its parent
       is the corresponding showing or hiding div */
    for (var i = 0; i < _.keys(clickDivs).length; i++) {
      if ($event.attr('class') !== _.keys(clickDivs)[i] &&
          $event.parent().attr('class') !== _.keys(clickDivs)[i]) {
        $(clickDivs[_.keys(clickDivs)[i]]).css('display', 'none');
      }
    }
  });

  $('.my-subreddits').click(function () {
    if ($('.my-subreddits-dropdown').css('display') === 'none') {
      $('.my-subreddits-dropdown').css('display', 'block');
    } else {
      $('.my-subreddits-dropdown').css('display', 'none');
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
    });
  });

  $('a.login').click(showLoginModal);

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
