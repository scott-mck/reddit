window.Reddit = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new Reddit.Routers.Router({
      $rootEl: $('#main')
    });

    var header = new Reddit.Views.Header({
      router: router
    });
    $('#header').html(header.render().$el);

    Backbone.history.start();
  }
};

$(document).ready(function(){
  // Reddit.initialize();
});
