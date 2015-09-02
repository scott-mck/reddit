Reddit.Views.Header = Backbone.View.extend({
  template: JST['header'],

  initialize: function (options) {
    this.router = options.router;
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
