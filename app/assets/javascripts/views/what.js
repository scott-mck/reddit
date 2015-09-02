Reddit.Views.Ad = Backbone.View.extend({
  template: JST['ad'],

  render: function () {
    var content = this.template({
      permalink: this.model.data.children[0].data.permalink,
      src: this.model.data.children[0].data.preview.images[0].source.url
    });
    this.$el.html(content);
    return this;
  }
});
