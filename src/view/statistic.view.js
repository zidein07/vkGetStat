var app = app || {};
var Backbone = Backbone || {};

app.statisticView = Backbone.View.extend({
  el: '.container',
  events: {

  },
  initialize: function () {

  },
  render: function () {
    this.token = app.token.getToken();
    this.fetchUserData().then(function (response) {
      console.log('response', response);
      var html = app.tpl.stat(

      );
      $('.statistic').html(html);
    });
  },
  fetchUserData: function () {
    var url = app.vk.getWall();
    return url.then(function (response) {
      return response.response;
    });
  }
});