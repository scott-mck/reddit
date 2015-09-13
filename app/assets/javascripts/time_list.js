$(document).ready(function() {
  $('.time-list').click(function () {
    if ($('.time-dropdown').css('display') === 'none') {
      $('.time-dropdown').css('display', 'block');
    } else {
      $('.time-dropdown').css('display', 'none');
    }
  });
});
