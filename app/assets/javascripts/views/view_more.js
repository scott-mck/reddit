Reddit.Views.ViewMore = Backbone.View.extend({
  template: JST['view_more'],
  className: 'view-more',

  render: function () {
    var content = this.template({

    });
    this.$el.html(content);
    return this;
  }
});
