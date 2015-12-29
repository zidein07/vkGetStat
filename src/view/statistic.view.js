var app = app || {};
var Backbone = Backbone || {};

app.statisticView = Backbone.View.extend({
  el: '.container',
  events: {
    'click #chartDataGroup': 'getIdGroup'
  },
  initialize: function () {

  },
  render: function () {
    app.loader.hide();
  },
  renderData: function (idGroup) {
    app.loader.show();
    var dataForChartWallItem = [];
    var dataForChartWallLikes = [];
    var dataForChartWallRepost = [];
    var self = this;
    this.token = app.token.getToken();
    app.getWallData.getDataFromApi(idGroup).then(function (response) {
      console.log('response[0]', response[0]);
      response.forEach(function (item) {
        var day = new Date(item.date * 1000).getDate();
        var month = new Date(item.date * 1000).getUTCMonth() + 1;
        var year = new Date(item.date * 1000).getUTCFullYear();
        var dateStr = day + '.' + month + '.' + year;
        if (!dataForChartWallItem[dateStr]) {
          dataForChart[dateStr] = [];
        } else {
          dataForChartWallItem[dateStr].push(item.date);
        }
        if (!dataForChartWallLikes[dateStr]) {
          dataForChart[dateStr] = [];
        } else {
          dataForChartWallLikes[dateStr].push(item.likes.count);
        }
        if (!dataForChartWallRepost[dateStr]) {
          dataForChartWallRepost[dateStr] = [];
        } else {
          dataForChartWallRepost[dateStr].push(item.reposts.count);
        }
      });
      app.chart.drawChart(dataForChartWallItem, idGroup, '#repost .statistic');
      app.chart.drawChart(dataForChartWallLikes, idGroup, '#like .statistic');
      app.chart.drawChart(dataForChartWallRepost, idGroup, '#record .statistic');
      
      app.loader.hide();
    });
  },
  getIdGroup: function () {
    var inputVal = $('#groupOrUserId').val();
    this.renderData(inputVal);
  }
});