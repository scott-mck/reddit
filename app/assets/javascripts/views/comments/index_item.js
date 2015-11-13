Reddit.Views.CommentsIndexItem = Backbone.CompositeView.extend({
  template: JST['comments/index_item'],
  className: 'comments-index-item',
  events: {
    'click .hide-comment': 'hideComment'
  },

  initialize: function (options) {
    this.index = options.index;
    this.op = options.op;
    this.authorIsOp = this.model.get('data').author === options.op;
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
            op: this.op,
            model: reply,
            index: this.index + 1
          });
          this.addSubview('.' + this.model.get('data').name, commentView);
        }
      }.bind(this));

    }
  },

  hideComment: function () {
    this.$('.hideable').css('display', 'none');
    this.$('.turn-gray').css('color', 'gray');
    this.$('.turn-italic').css('font-style', 'italic');
    this.$('.hide-comment').text('[+]');
  },

  render: function () {
    var content = this.template({
      authorIsOp: this.authorIsOp,
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
