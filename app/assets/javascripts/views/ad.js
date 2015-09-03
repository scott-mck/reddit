Reddit.Views.Ad = Backbone.View.extend({
  template: JST['ad'],

  render: function () {
    var content = this.template({
      permalink: this.model.data.permalink,
      src: this.model.data.preview.images[0].source.url,
      url: this.model.data.url
    });
    this.$el.html(content);
    return this;
  }
});
