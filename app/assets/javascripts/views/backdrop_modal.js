Reddit.Views.BackdropModal = Backbone.View.extend({
  template: JST['modal_backdrop'],
  events: {
    'click': 'exit'
  },

  initialize: function (options) {
    this.backdropDelay = options.backdropDelay;
    this.modalDelay = options.modalDelay;
    this.login = options.login;
    this.$el.css('transition', options.backdropDelay + 'ms');
  },

  exit: function (event) {
    if (!$(event.currentTarget).hasClass('backdrop')) {
      return;
    }

    setTimeout(function () {
      this.$el.css('opacity', 0);
      this.$el.on('transitionend', function () {
        this.remove();
      }.bind(this));
      this.login.remove();
    }.bind(this), this.modalDelay);
  },

  render: function () {
    setTimeout(function () {
      this.$el.addClass('backdrop');
    }.bind(this), 0);
    var content = this.template;
    this.$el.html(content);
    return this;
  }
});
