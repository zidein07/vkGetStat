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
    console.log('hiGuys!');
  },
  renderData: function (idGroup) {
    var dataForChart = [];
    var self = this;
    this.token = app.token.getToken();
    this.fetchWallData(idGroup).then(function (response) {
      response.forEach(function (item) {
        var day = item.date.getDate();
        var month = item.date.getUTCMonth() + 1;
        var year = item.date.getUTCFullYear();
        var dateStr = day + '.' + month + '.' + year;
        if (!dataForChart[dateStr]) {
          dataForChart[dateStr] = [];
        }
        dataForChart[dateStr].push(item);
      });
      self.chart(dataForChart, idGroup);
    });
  },
  fetchWallData: function (id) {
    var dataStat = [];
    var url = app.vk.getWall({
      owner_id: id,
      count: 100,
      offset: 0
    });
    return url.then(function (response) {
      var dataResponse = response.response;
      dataResponse.map(function (item) {
        dataStat.push({
          date: new Date(item.date * 1000)
        });
      });
      return dataStat;
    });
  },
  chart: function (data, idGroupOrUser) {
    console.log('data', data);
    var category = [];
    var columnData = ['id: ' + idGroupOrUser];
    for (var item in data) {
      columnData.push(data[item].length);
      category.push(item);
    }
    var chart = c3.generate({
      bindto: '.statistic',
      data: {
        columns: [
          columnData
        ]
      },
      axis: {
        x: {
          type: 'category',
          categories: category
        }
      },
      zoom: {
        enabled: true
      }
    });
  },
  getIdGroup: function () {
    var inputVal = $('#groupOrUserId').val();
    this.renderData(inputVal);
  }
});