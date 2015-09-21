Reddit.Views.SponsoredPost = Backbone.View.extend({
  template: JST['posts/sponsored'],
  className: 'posts-index-item sponsored',
  events: {
    'click .prev': 'showPrevPost',
    'click .next': 'showNextPost',
    'mouseenter .whats-this': 'showDescription',
    'mouseleave .whats-this': 'hideDescription',
    'mouseenter .whats-this-description': 'showDescription',
    'mouseleave .whats-this-description': 'hideDescription'
  },

  initialize: function () {
    this.index = 0;
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
    } else if (this.model.get('data').thumbnail !== '') {
      thumbnail = this.model.get('data').thumbnail;
    }

    if (this.model.get('data').hide_score) {
      score = '•';
    } else {
      score = this.model.get('data').score;
    }

    var content = this.template({
      thumbnail: thumbnail,
      score: score,
      post: this.model,
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
  },

  showNextPost: function () {
    this.index = (this.index + 1) % 9;
    this.model = this.collection[this.index];
    this.render();
  },

  showPrevPost: function () {
    this.index -= 1;
    if (this.index < 0) {
      this.index = 9;
    }
    this.model = this.collection[this.index];
    this.render();
  }
});
