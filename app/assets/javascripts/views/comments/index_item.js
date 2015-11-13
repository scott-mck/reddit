Reddit.Views.CommentsIndexItem = Backbone.CompositeView.extend({
  template: JST['comments/index_item'],
  className: 'comments-index-item',
  events: {
    'click .hide-comment': 'hideComment',
    'click .show-comment': 'showComment'
  },

  initialize: function (options) {
    this.op = options.op;
    this.authorIsOp = this.model.get('data').author === options.op;
  },

  addReplies: function () {
    if (this.model.get('data').replies && this.model.get('data').replies !== "") {

      this.model.get('data').replies.data.children.forEach(function (replyData) {
        if (replyData.kind === "more") {
          var loadMore = new Reddit.Views.LoadMore({
            count: replyData.data.count
          });
          this.addSubview('.' + this.model.get('data').name, loadMore);
        } else if (replyData.kind === "t1") {
          var reply = new Reddit.Models.Comment(replyData);
          var commentView = new Reddit.Views.CommentsIndexItem({
            op: this.op,
            model: reply,
            parent: this
          });
          this.addSubview('.' + this.model.get('data').name, commentView);
        }
      }.bind(this));

    }
  },

  hideComment: function () {
    this.$('.hide-votes').css('display', 'none');
    this.$('.hideable').css('display', 'none');

    this.$('.turn-gray').addClass('gray');
    this.$('.turn-italic').css('font-style', 'italic');

    var length = $('.comments-index-item').length;
    var children = $('<span class="children">');
    children.append('(' + length + ' children)');
    this.$('.detail').append(children);

    this.$('.hide-comment').text('[+]');
    this.$('.hide-comment').removeClass('hide-comment').addClass('show-comment');
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
  },

  showComment: function () {
    this.$('.hide-votes').css('display', 'block');
    this.$('.hideable').css('display', 'block');

    this.$('.turn-gray').removeClass('gray');
    this.$('.turn-italic').css('font-style', 'normal');

    this.$('.detail span.children').remove();

    this.$('.show-comment').text('[-]');
    this.$('.show-comment').removeClass('show-comment').addClass('hide-comment');
  }
});
