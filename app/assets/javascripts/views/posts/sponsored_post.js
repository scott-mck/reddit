Reddit.Views.SponsoredPost = Backbone.View.extend({
  template: JST['posts/sponsored'],

  render: function () {
    var content = this.template({
      thumbnail: this.model.get('data').thumbnail,
      post: this.model,
      paddingLeft: '4px;',
      num_comments: this.model.get('data').num_comments
    });
    this.$el.html(content);
    return this;
  }
});
