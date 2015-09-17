Reddit.Views.SharePartial = Backbone.View.extend({
  template: JST['share_partial'],
  className: 'share-transition',
  events: {
    'click .close': 'exit'
  },

  initialize: function (options) {
    this.removeFn = options.removeFn;
    this.link = options.link;
  },

  exit: function () {
    this.removeFn();
  },

  render: function () {
    var content = this.template({
      link: this.link
    });
    this.$el.html(content);
    return this;
  }
});
