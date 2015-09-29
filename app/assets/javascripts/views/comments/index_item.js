Reddit.Views.CommentsIndexItem = Backbone.CompositeView.extend({
  template: JST['comments/index_item'],
  className: 'comments-index-item',

  addReplies: function () {
    if (this.model.get('data').replies && this.model.get('data').replies !== "") {

      this.model.get('data').replies.data.children.forEach(function (replyData) {
        var reply = new Reddit.Models.Comment(replyData);
        var commentView = new Reddit.Views.CommentsIndexItem({
          model: reply
        });

        this.addSubview('.' + this.model.get('data').name, commentView);
      }.bind(this));

    }
  },

  render: function () {
    var content = this.template({
      author: this.model.get('data').author,
      body: this.model.get('data').body,
      score: this.model.get('data').score,
      name: this.model.get('data').name
    });
    this.$el.html(content);

    this.addReplies();
    return this;
  }
});
