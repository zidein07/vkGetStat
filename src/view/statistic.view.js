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
        if (!dataForChartWallItem[dateStr] || !dataForChartWallLikes[item.likes.count] || !dataForChartWallRepost[item.reposts.count]) {
          dataForChartWallItem[dateStr] = [];
          dataForChartWallLikes[item.likes.count] = [];
          dataForChartWallRepost[item.reposts.count] = [];
        }
        dataForChartWallItem[dateStr].push(item.date);
        dataForChartWallLikes[item.likes.count].push(dateStr);
        dataForChartWallRepost[item.reposts.count].push(dateStr);
      });
      app.chart.drawChartRecord(dataForChartWallItem, idGroup);
      app.chart.drawChartLike(dataForChartWallLikes, idGroup, dataForChartWallItem);
      app.chart.drawChartRepost(dataForChartWallRepost, idGroup, dataForChartWallItem);

      app.loader.hide();
    });
  },
  getIdGroup: function () {
    var inputVal = $('#groupOrUserId').val();
    this.renderData(inputVal);
  }
});