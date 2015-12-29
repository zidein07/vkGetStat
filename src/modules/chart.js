var app = app || {};
var Backbone = Backbone || {};

app.chart = {
  drawChart: function (data, idGroupOrUser, select) {
    console.log('data', data);
    var category = [];
    var columnData = ['id: ' + idGroupOrUser];
    for (var item in data) {
      columnData.push(data[item].length);
      category.push(item);
    }
    var chart = c3.generate({
      bindto: select,
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
      size: {
        height: 500
      },
      zoom: {
        enabled: true
      }
    });
  }
};