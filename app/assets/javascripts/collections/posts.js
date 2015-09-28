Reddit.Collections.Posts = Backbone.Collection.extend({
  model: Reddit.Models.Post,

  parse: function (res) {
    if (res.data) {
      if (res.data.children[0].kind === "t3") {
        return res.data.children; // fetch only posts
      }
    }
  }
});
