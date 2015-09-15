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

  $('a.login').click(function () {
    // backdropDelay is time it takes for backdrop to transition
    // after it's finished, add the login modal to page
    var backdropDelay = 400;

    // modalDelay is time it takes for modal to transition
    // on modal exit, backdrop waits this long before transitioning and removing
    var modalDelay = 600;

    // overlap is how long after backdrop starts transitioning before modal
    // is put onto the page
    var overlap = 100;

    login = new Reddit.Views.LoginModal({
      backdropDelay: backdropDelay,
      modalDelay: modalDelay
    });

    backdrop = new Reddit.Views.BackdropModal({
      backdropDelay: backdropDelay,
      modalDelay: modalDelay,
      login: login
    });

    $('body').prepend(backdrop.render().$el);
    $('body').prepend(login.render().$el);

    setTimeout(function () {
      login.$el.addClass('login-modal');
      login.$el.css('top', '30px');
    }, overlap);
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
