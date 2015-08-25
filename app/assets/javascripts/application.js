// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
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

function hideDropdown() {
  $('.my-subreddits-dropdown').hide();
};

function showDropdown() {
  $('.my-subreddits-dropdown').show();
};

$(document).ready(function() {
  $(document).mouseup(function (event) {
    var container = $('.my-subreddits-dropdown');

    if (!container.is(event.target) &&
          container.has(event.target).length === 0) {
      container.hide();
    }
  });

  $('.my-subreddits').click(function (event) {
    if ($('.my-subreddits-dropdown').css('display') === 'none') {
      showDropdown();
    } else {
      hideDropdown();
    }
  });

  $('.tab').click(function (event) {
    // var path = window.location.pathname;
    // alert(path.slice(path.substr('/'), path.length))
  });
});
