var app = app || {};
var Backbone = Backbone || {};

app.wallSortView = Backbone.View.extend({
  el: '.container',
  initialize: function () {

  },
  render: function () {
    var html = app.tpl.sortWallVk();
    $('.content').html(html);
    app.loader.hide();
  }
});