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
    setTimeout(function () {
      this.$('.login input[name="username"]').focus()
      this.$('.login input[name="username"]').select()
    }.bind(this), 0);
    return this;
  }
});
