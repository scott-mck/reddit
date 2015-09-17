// TODO: domain links to real reddit /domain
// TODO: link title links to real reddit post
// TODO: user links to actual user's page
// TODO: change thumbnails to nsfw thumbnail
// TODO: description needs further styling

Reddit.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['posts/index_item'],
  className: 'posts-index-item',
  events: {
    'click img.arrow': 'showLoginModal',
    'click .embed': 'toggleEmbedContent',
    'click .show-share': 'toggleShare'
  },

  initialize: function (options) {
    this.index = options.index;
  },

  hideEmbedContent: function (event) {
    this.$('.embed').removeClass('clicked');
    this.$('.embed-content').remove();
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

    var embedClass;
    if (this.model.get('data').selftext_html) {
      embedClass = 'embed-desc';
      this.embedContent = this.model.get('data').selftext_html;
    } else if (this.model.get('data').secure_media_embed.content) {
      embedClass = 'embed-video';
      this.embedContent = this.model.get('data').secure_media_embed.content;
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
      index: this.index,
      numComments: this.model.get('data').num_comments
    });
    this.$el.html(content);
    return this;
  },

  showEmbedContent: function () {
    this.$('.embed').addClass('clicked');
    var description = $(_.unescape(this.embedContent));
    description.addClass('embed-content');

    if (this.$('.embed').attr('class').indexOf('desc') > -1) {
      description.addClass('description');
    } else if (this.$('.embed').attr('class').indexOf('video') > -1) {
      description.addClass('video');
    }

    this.$('.post-content').append(description);
  },

  toggleEmbedContent: function () {
    if (this.$('.embed').hasClass('clicked')) {
      this.hideEmbedContent();
    } else {
      this.showEmbedContent();
    }
  },

  toggleShare: function () {
    if (this.$('.show-share').hasClass('clicked')) {
      this.$('.show-share').removeClass('clicked');
      this.$('.share').remove();
    } else {
      this.$('.show-share').addClass('clicked');

      var view = new Reddit.Views.SharePartial();
      this.$('.post-content').append(view.render().$el);
    }
  },
});
