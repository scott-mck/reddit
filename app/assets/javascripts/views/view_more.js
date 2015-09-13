Reddit.Views.ViewMore = Backbone.View.extend({
  template: JST['view_more'],
  className: 'view-more',

  initialize: function (options) {
    this.after = options.after;
    this.before = options.before;
    this.countAfter = options.countAfter;
    this.countBefore = options.countBefore;
  },

  render: function () {
    var query = this.replaceQueryString(window.location.search);
    if (query === '' || query === '?') {
      query = '?';
    } else {
      query += '&';
    }
    
    var content = this.template({
      currentUrl: window.location.pathname + query,
      after: this.after,
      before: this.before,
      countAfter: 'count=' + this.countAfter,
      countBefore: 'count=' + this.countBefore
    });
    this.$el.html(content);
    return this;
  },

  replaceQueryString: function (query) {
    var string = query;
    var count = string.match(/(&*count=\d+)/) || [''];
    var after = string.match(/(&*after=\w+)/) || [''];
    var before = string.match(/(&*before=\w+)/) || [''];
    string = string.replace(count[count.length - 1], '');
    string = string.replace(after[after.length - 1], '');
    string = string.replace(before[before.length - 1], '');
    return string
  }
});
