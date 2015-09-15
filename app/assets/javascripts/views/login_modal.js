Reddit.Views.LoginModal = Backbone.View.extend({
  template: JST['login_modal'],
  className: 'modal-box',
  events: {
    'click .close': 'exit'
  },

  initialize: function (options) {
    this.backdrop = options.backdrop;
  },

  exit: function () {
    removeLoginModal($('.backdrop'), this);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
