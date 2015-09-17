Reddit.Views.SharePartial = Backbone.View.extend({
  template: JST['share_partial'],
  className: 'share',

  render: function () {
    var content = this.template;
    this.$el.html(content);
    return this;
  }
});
