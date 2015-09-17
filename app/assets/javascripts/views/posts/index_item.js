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
  },

  initialize: function (options) {
    this.index = options.index;
  },

  hideEmbedContent: function (event) {
    $(event.currentTarget).removeClass('clicked');
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

  showEmbedContent: function (event) {
    $(event.currentTarget).addClass('clicked');
    var description = $(_.unescape(this.embedContent));
    description.addClass('embed-content');

    if ($(event.currentTarget).attr('class').indexOf('desc') > -1) {
      description.addClass('description');
    } else if ($(event.currentTarget).attr('class').indexOf('video') > -1) {
      description.addClass('video');
    }

    this.$('.post-content').append(description);
  },

  toggleEmbedContent: function (event) {
    if ($(event.currentTarget).hasClass('clicked')) {
      this.hideEmbedContent(event);
    } else {
      this.showEmbedContent(event);
    }
  },

  showLoginModal: function () {
    showLoginModal();
  }
});
