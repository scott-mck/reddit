Reddit.Views.SponsoredPost = Backbone.View.extend({
  template: JST['posts/sponsored'],
  className: 'posts-index-item',
  events: {
    'mouseenter .whats-this': 'showDescription',
    'mouseleave .whats-this': 'hideDescription'
  },

  hideDescription: function () {
    this.$('.whats-this-description').css('visibility', 'hidden');
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
    this.$('.whats-this-description').css('visibility', 'visible');
    this.$('.whats-this-description').css('opacity', 1);
  }
});
