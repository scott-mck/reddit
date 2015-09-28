Reddit.Collections.Comments = Backbone.Collection.extend({
  model: Reddit.Models.Comment,

  parse: function (res) {
    if (res.data.children) {
      if (res.data.children[0].kind === "t1") {
        return res.data.children; // fetch only comments
      }
    }
  }
});
