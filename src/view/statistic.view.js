var app = app || {};
var Backbone = Backbone || {};

app.statisticView = Backbone.View.extend({
  el: '.container',
  events: {},
  initialize: function () {

  },
  render: function () {
    var dataForChart = [];
    this.token = app.token.getToken();
    this.fetchWallData().then(function (response) {
      response.forEach(function (item) {
        var day = item.date.getDate();
        var month = item.date.getUTCMonth() + 1;
        var year = item.date.getUTCFullYear();
        var dateStr = day + '.' + month + '.' + year;
        if (!dataForChart[dateStr]) {
          dataForChart[dateStr] = [];
        }
        dataForChart[dateStr].push(item);
//        console.log(dataForChart[dateStr]);
      });
      console.log('dataForChart', dataForChart);

    });
  },
  fetchWallData: function () {
    var dataStat = [];
    var url = app.vk.getWall({
      owner_id: '-51313495',
      count: 100
    });
    return url.then(function (response) {
      var dataResponse = response.response.splice(1);
      dataResponse.map(function (item) {
        dataStat.push({
          date: new Date(item.date * 1000)
        });
      });
      return dataStat;
    });
  }
});