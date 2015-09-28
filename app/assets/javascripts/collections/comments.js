Reddit.Collections.Comments = Backbone.Collection.extend({
  model: Reddit.Models.Comment,

  parse: function (res) {
    if (res[1].data.children) {
      if (res[1].data.children[0].kind === "t1") {
        return res[1].data.children; // fetch only comments
      }
    }
  }
});
