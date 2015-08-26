Reddit.Collections.Posts = Backbone.Collection.extend({
  model: Reddit.Models.Post,

  parse: function (res) {
    return res.data.children;
  }
});
