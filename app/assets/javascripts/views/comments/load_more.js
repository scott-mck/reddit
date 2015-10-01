Reddit.Views.LoadMore = Backbone.CompositeView.extend({
  template: JST['comments/load_more'],
  className: 'load-more comments-index-item',

  initialize: function (options) {
    this.count = options.count;
    this.index = options.index;
    if (this.index > 9) {
      this.continueThread = true;
    }
  },

  render: function () {
    var content = this.template({
      continueThread: this.continueThread,
      count: this.count
    });
    this.$el.html(content);
    return this;
  }
});
