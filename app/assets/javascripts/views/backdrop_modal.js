Reddit.Views.BackdropModal = Backbone.View.extend({
  template: JST['modal_backdrop'],
  events: {
    'click': 'exit'
  },

  exit: function (event) {
    if (!$(event.currentTarget).hasClass('backdrop')) {
      return;
    }

    setTimeout(function () {
      this.$el.css('opacity', 0);
    }.bind(this), 400);

    setTimeout(function () {
      this.remove();
    }.bind(this), 800);
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
