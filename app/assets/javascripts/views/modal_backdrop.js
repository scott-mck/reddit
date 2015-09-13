Reddit.Views.ModalBackdrop = Backbone.View.extend({
  template: JST['modal_backdrop'],

  render: function () {
    setTimeout(function () {
      this.$el.addClass('backdrop');
    }.bind(this), 0);
    var content = this.template;
    this.$el.html(content);
    return this;
  }
});
