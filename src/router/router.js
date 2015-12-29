var app = app || {};
var Backbone = Backbone || {};

app.Router = Backbone.Router.extend({
  initialize: function () {
    this.statisticView = new app.statisticView();
    this.wallSortView = new app.wallSortView();
    this.indexView = new app.indexView();
    this.menuView = new app.menuView();
  },
  routes: {
    '': 'index',
    'sort': 'wallSort',
    'stat': 'wallStatistic'
  },
  index: function () {
    this.menuView.render();
    this.indexView.render();
  },
  wallSort: function () {
    this.menuView.render();
    this.wallSortView.render();

  },
  wallStatistic: function () {
    this.menuView.render();
    this.statisticView.render();
  }
});
