Reddit.Views.CommentsIndexItem = Backbone.View.extend({
  template: JST['comments/index_item'],
  className: 'comments-index-item',

  render: function () {
    var content = this.template({
      author: this.model.get('data').author,
      body: this.model.get('data').body,
      score: this.model.get('data').score
    });
    this.$el.html(content);
    return this;
  }
});
