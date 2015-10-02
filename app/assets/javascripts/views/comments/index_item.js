Reddit.Views.CommentsIndexItem = Backbone.CompositeView.extend({
  template: JST['comments/index_item'],
  className: 'comments-index-item',

  initialize: function (options) {
    this.index = options.index;
  },

  addReplies: function () {
    if (this.model.get('data').replies && this.model.get('data').replies !== "") {

      this.model.get('data').replies.data.children.forEach(function (replyData) {
        if (replyData.kind === "more") {
          var loadMore = new Reddit.Views.LoadMore({
            index: this.index + 1,
            count: replyData.data.count
          });
          this.addSubview('.' + this.model.get('data').name, loadMore);
        } else if (replyData.kind === "t1") {
          var reply = new Reddit.Models.Comment(replyData);
          var commentView = new Reddit.Views.CommentsIndexItem({
            model: reply,
            index: this.index + 1
          });
          this.addSubview('.' + this.model.get('data').name, commentView);
        }
      }.bind(this));

    }
  },

  render: function () {
    var content = this.template({
      author: this.model.get('data').author,
      body: _.unescape(this.model.get('data').body_html),
      score: this.model.get('data').score,
      name: this.model.get('data').name,
      permalink: this.model.get('data').id,
      showMore: this.showMore
    });
    this.$el.html(content);

    this.addReplies();
    return this;
  }
});
