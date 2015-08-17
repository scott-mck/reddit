Reddit.Views.PostsIndex = Backbone.CompositeView.extend({
  template: JST['posts/index'],

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addPost);
  },

  addPost: function (post) {
    var view = new Reddit.Views.PostsIndexItem({
      model: post
    });
    this.addSubview('.posts', view);
  },

  render: function () {
    var content = this.template({
      posts: this.collection
    });
    this.attachSubviews();
    this.$el.html(content);
    return this;
  }
});
