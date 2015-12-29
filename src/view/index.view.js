var app = app || {};
var Backbone = Backbone || {};

app.indexView = Backbone.View.extend({
  el: '.container',
  initialize: function () {

  },
  render: function () {
    app.loader.hide();
    console.log('index');
  }
});