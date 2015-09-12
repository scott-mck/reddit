Reddit.Views.ViewMore = Backbone.View.extend({
  template: JST['view_more'],
  className: 'view-more',

  initialize: function (options) {
    this.after = options.after;
    this.before = options.before;
  },

  render: function () {
    var searchQuery;
    if (window.location.search === '') {
      searchQuery = '?';
    } else {
      searchQuery = window.location.search + '&';
    }
    var content = this.template({
      currentUrl: window.location.pathname + searchQuery,
      after: this.after,
      before: this.before
    });
    this.$el.html(content);
    return this;
  }
});
