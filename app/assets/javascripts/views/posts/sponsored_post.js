Reddit.Views.SponsoredPost = Backbone.View.extend({
  template: JST['posts/sponsored'],
  className: 'posts-index-item',
  events: {
    'mouseenter .whats-this': 'showDescription',
    'mouseleave .whats-this': 'hideDescription',
    'mouseenter .whats-this-description': 'showDescription',
    'mouseleave .whats-this-description': 'hideDescription'
  },

  hideDescription: function () {
    if (window.showWhatsThisId) {
      clearTimeout(window.showWhatsThisId);
    }

    window.hideWhatsThisId = setTimeout(function () {
      this.$('.whats-this-description').css('visibility', 'hidden');
      this.$('.whats-this-description').css('opacity', 0);
      this.$('.whats-this-description').css('bottom', '-54px');
    }, 800);
  },

  render: function () {
    var defaults = ['self', 'nsfw', 'default'];
    var thumbnail;
    var paddingLeft;
    var score;

    if (defaults.indexOf(this.model.get('data').thumbnail) > -1) {
      thumbnail = 'https://www.reddit.com/static/self_default2.png';
      paddingLeft = '145px;';
    } else if (this.model.get('data').thumbnail !== '') {
      thumbnail = this.model.get('data').thumbnail;
      paddingLeft = '145px;';
    } else {
      paddingLeft = '70px';
    }

    if (this.model.get('data').hide_score) {
      score = '•';
    } else {
      score = this.model.get('data').score;
    }

    var content = this.template({
      thumbnail: this.model.get('data').thumbnail,
      score: score,
      post: this.model,
      paddingLeft: paddingLeft,
      num_comments: this.model.get('data').num_comments
    });
    this.$el.html(content);
    return this;
  },

  showDescription: function () {
    if (window.hideWhatsThisId) {
      clearTimeout(window.hideWhatsThisId)
    }

    window.showWhatsThisId = setTimeout(function () {
      this.$('.whats-this-description').css('visibility', 'visible');
      this.$('.whats-this-description').css('opacity', 1);
      this.$('.whats-this-description').css('bottom', '-59px');
    }, 200);
  }
});
