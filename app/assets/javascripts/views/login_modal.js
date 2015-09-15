Reddit.Views.LoginModal = Backbone.View.extend({
  template: JST['login_modal'],

  initialize: function (options) {
    this.modalDelay = options.modalDelay;
    this.$el.css('transition', options.modalDelay + 'ms linear');
    this.$el.css('top', '-50px');
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
