Reddit.Views.SharePartial = Backbone.View.extend({
  template: JST['share_partial'],
  className: 'share-transition',

  render: function () {
    var content = this.template;
    this.$el.html(content);
    return this;
  }
});
