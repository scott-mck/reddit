Reddit.Views.CommentsSort = Backbone.CompositeView.extend({
  template: JST['comments/sort'],

  initialize: function (options) {
    this.numComments = options.numComments;
  },

  render: function () {
    var showComments = this.numComments;
    var showLink = true;

    var limit = window.location.search.match(/limit=(\d+)/);
    if (limit) {
      limit = parseInt(_.last(limit));
      showLink = false;
    } else {
      limit = 200;
    }

    if (showComments > limit) {
      showComments = limit;
    }

    var content = this.template({
      numComments: this.numComments,
      showComments: showComments,
      showLink: showLink
    });

    this.$el.html(content);
    return this;
  }
});
