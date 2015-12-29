var app = app || {};
var Backbone = Backbone || {};

app.menuView = Backbone.View.extend({
  el: '.container',
  initialize: function () {

  },
  render: function () {
    var html = app.tpl.menuTpl();
    $('.nav-wrapper').html(html);
    app.loader.hide();
  }
});