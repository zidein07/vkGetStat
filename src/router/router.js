var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    this.statisticView = new app.statisticView();
  },
  routes: {
    '': 'index'
  },
  index: function () {
    this.statisticView.render();
  }
});
