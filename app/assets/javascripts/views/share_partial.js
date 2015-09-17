Reddit.Views.SharePartial = Backbone.View.extend({
  template: JST['share_partial'],
  className: 'share-transition',
  events: {
    'click .close': 'exit'
  },

  initialize: function (options) {
    this.removeFn = options.removeFn;
  },

  exit: function () {
    this.removeFn();
  },

  render: function () {
    var content = this.template;
    this.$el.html(content);
    return this;
  }
});
