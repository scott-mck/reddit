Reddit.Views.TrendingSubreddits = Backbone.View.extend({
  template: JST['trending_subreddits'],

  initialize: function (options) {
    this.subs = options.subs;
    this.numComments = options.numComments;
    this.permalink = options.permalink;
  },

  render: function () {
    var content = this.template({
      subs: this.subs,
      numComments: this.numComments,
      permalink: this.permalink
    });
    this.$el.html(content);
    return this;
  }
});
