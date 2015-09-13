Reddit.Views.ViewMore = Backbone.View.extend({
  template: JST['view_more'],
  className: 'view-more',

  initialize: function (options) {
    this.after = options.after;
    this.before = options.before;
  },

  render: function () {
    var query = window.location.search;
    var count = query.match(/(&*count=\d+)/) || ['', ''];
    var after = query.match(/(&*after=\w+)/) || ['', ''];
    var before = query.match(/(&*before=\w+)/) || ['', ''];
    query = query.replace(count[1], '');
    query = query.replace(after[1], '');
    query = query.replace(before[1], '');

    if (query === '' || query === '?') {
      query = '?';
    } else {
      query += '&';
    }
    var content = this.template({
      currentUrl: window.location.pathname + query,
      after: this.after,
      before: this.before
    });
    this.$el.html(content);
    return this;
  }
});
