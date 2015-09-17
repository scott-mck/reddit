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

  getEmbedContent: function () {
    if (this.model.get('data').selftext_html) {
      this.embedClass = 'embed-desc';
      this.embedContent = this.model.get('data').selftext_html;
    } else if (this.model.get('data').secure_media_embed.content) {
      this.embedClass = 'embed-video';
      this.embedContent = this.model.get('data').secure_media_embed.content;
    }
  },

  getScore: function () {
    if (this.model.get('data').hide_score) {
      this.score = '•';
    } else {
      this.score = this.model.get('data').score;
    }
  },

  getThumbnail: function () {
    var defaults = ['self', 'nsfw', 'default'];

    if (defaults.indexOf(this.model.get('data').thumbnail) > -1) {
      // show default thumbnail
      this.thumbnail = 'https://www.reddit.com/static/self_default2.png';
      this.paddingLeft = '151px;';
    } else if (this.model.get('data').thumbnail !== '') {
      // show given thumbnail
      this.thumbnail = this.model.get('data').thumbnail;
      this.paddingLeft = '151px;';
    } else {
      // no thumbnail
      this.paddingLeft = '76px';
    }
  },

  hideEmbedContent: function (event) {
    this.$('.embed').removeClass('clicked');
    this.$('.embed-content').remove();
  },

  hideShare: function () {
    if (this.transitioning) return;
    this.transitioning = true;

    this.$('.show-share').removeClass('clicked');

    this.$('.share').addClass('share-transition');
    setTimeout(function () {
      this.$('.share').remove();
      this.transitioning = false;
    }.bind(this), 200); // transitionend doesn't work! ugh!
  },

  render: function () {
    this.getThumbnail();
    this.getEmbedContent();
    this.getScore();

    var content = this.template({
      post: this.model,
      score: this.score,
      thumbnail: this.thumbnail,
      paddingLeft: this.paddingLeft,
      embedClass: this.embedClass,
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

  showShare: function () {
    if (this.transitioning) return;
    this.transitioning = true;

    this.$('.show-share').addClass('clicked');
    var view = new Reddit.Views.SharePartial({
      removeFn: this.hideShare.bind(this),
      link: this.model.get('data').permalink
    });
    this.$('.post-content').append(view.render().$el);

    setTimeout(function () {
      this.$('.share-transition').addClass('share');
      this.$('.share').removeClass('share-transition');
      this.$('.share').one('transitionend', function () {
        this.$('.share input').focus();
        this.$('.share input').select();
      }.bind(this));
      this.transitioning = false;
    }.bind(this), 0);
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
      this.hideShare();
    } else {
      this.showShare();
    }
  },
});
