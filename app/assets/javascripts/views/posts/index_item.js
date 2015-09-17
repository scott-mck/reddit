// TODO: domain links to real reddit /domain
// TODO: link title links to real reddit post
// TODO: user links to actual user's page
// TODO: change thumbnails to nsfw thumbnail
// TODO: add embedded videos and pictures
// TODO: description needs further styling

Reddit.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['posts/index_item'],
  className: 'posts-index-item',
  events: {
    'click img.arrow': 'showLoginModal',
    'click .embed': 'showDescription',
    'click .clicked': 'hideDescription'
  },

  initialize: function (options) {
    this.index = options.index;
  },

  hideDescription: function () {
    this.$('.embed').removeClass('clicked');
    this.$('.md').remove();
  },

  render: function () {
    var defaults = ['self', 'nsfw', 'default'];
    var thumbnail, paddingLeft, score;

    if (defaults.indexOf(this.model.get('data').thumbnail) > -1) {
      // show default thumbnail
      thumbnail = 'https://www.reddit.com/static/self_default2.png';
      paddingLeft = '151px;';
    } else if (this.model.get('data').thumbnail !== '') {
      // show given thumbnail
      thumbnail = this.model.get('data').thumbnail;
      paddingLeft = '151px;';
    } else {
      // no thumbnail
      paddingLeft = '76px';
    }

    var embedClass, embedContent;
    if (this.model.get('data').selftext_html) {
      embedClass = 'desc';
      embedContent = this.model.get('data').selftext_html;
    }

    if (this.model.get('data').hide_score) {
      score = '•';
    } else {
      score = this.model.get('data').score;
    }

    var content = this.template({
      post: this.model,
      score: score,
      thumbnail: thumbnail,
      paddingLeft: paddingLeft,
      embedClass: embedClass,
      embedContent: embedContent,
      index: this.index,
      numComments: this.model.get('data').num_comments
    });
    this.$el.html(content);
    return this;
  },

  showDescription: function () {
    this.$('.embed').addClass('clicked');

    var description = _.unescape(this.model.get('data').selftext_html);
    this.$('.post-content').append(description);
  },

  showLoginModal: function () {
    showLoginModal();
  }
});
