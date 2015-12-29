var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    this.statisticView = new app.statisticView();
    this.wallSort = new app.wallSort();
    this.indexView = new app.indexView();
  },
  routes: {
    '': 'index',
    'sort': 'wallSort',
    'stat': 'wallStatistic'
  },
  index: function () {
    this.indexView.render();
  },
  wallSort: function () {
    this.wallSort.render();
  },
  wallStatistic: function () {
    this.statisticView.render();
  }
});
