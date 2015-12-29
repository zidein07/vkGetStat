var app = app || {};
var Backbone = Backbone || {};

app.indexView = Backbone.View.extend({
  el: '.container',
  initialize: function () {

  },
  render: function () {
    var html = app.tpl.index();
    $('.container').html(html);
    app.loader.hide();
  }
});