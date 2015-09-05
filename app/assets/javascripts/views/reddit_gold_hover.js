Reddit.Views.RedditGoldHover = Backbone.View.extend({
  template: JST['reddit_gold_hover'],
  className: 'gold-dropdown',

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
