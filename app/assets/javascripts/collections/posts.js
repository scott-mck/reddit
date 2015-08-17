Reddit.Collections.Posts = Backbone.Collection.extend({
  url: 'api/posts',
  model: Reddit.Models.Post
});
