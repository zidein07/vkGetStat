var app = app || {};
var Backbone = Backbone || {};

app.statisticView = Backbone.View.extend({
  el: '.container',
  events: {
    'click #chartDataGroup': 'getIdGroup'
  },
  initialize: function () {
    this.defaultLimit = 1;
    this.offset = 0;
    this.timeout = 100;
  },
  render: function () {
    console.log('hiGuys!');
  },
  renderData: function (idGroup) {
    var dataForChart = [];
    var self = this;
    this.token = app.token.getToken();
    app.getWallData.getDataFromApi(idGroup).then(function (response) {
      console.log('obj', response);
      response.forEach(function (item) {
        var day = new Date(item * 1000).getDate();
        var month = new Date(item * 1000).getUTCMonth() + 1;
        var year = new Date(item * 1000).getUTCFullYear();
        var dateStr = day + '.' + month + '.' + year;
        if (!dataForChart[dateStr]) {
          dataForChart[dateStr] = [];
        }
        dataForChart[dateStr].push(item);
      });
      self.chart(dataForChart, idGroup);
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