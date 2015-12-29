var app = app || {};
var Backbone = Backbone || {};

app.wallSort = Backbone.View.extend({
  el: '.container',
  initialize: function () {

  },
  render: function () {
    var html = app.tpl.sortWallVk();
    $('.container').html(html);
    app.loader.hide();
  }
});