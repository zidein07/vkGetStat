var app = app || {};
var Backbone = Backbone || {};

app.chart = {
  drawChartRecord: function (data, idGroupOrUser) {
    console.log('Record: ', data);
    var category = [];
    var columnData = ['id: ' + idGroupOrUser];
    for (var item in data) {
      columnData.push(data[item].length);
      category.push(item);
    }
    console.log('columnData', columnData);
    console.log('category', category);
    var chart = c3.generate({
      bindto: '#record .statistic',
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
  },
  drawChartLike: function (data, idGroupOrUser) {
    console.log('Like: ', data);
    var category = [];
    var columnData = ['id: ' + idGroupOrUser];
    for (var item in data) {
      category.push(data[item]);
      columnData.push(item);
    }
    console.log('columnData', columnData);
    console.log('category', category);
    var chart = c3.generate({
      bindto: '#like .statistic',
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
  },
  drawChartRepost: function (data, idGroupOrUser) {
    console.log('Repost: ', data);
    var category = [];
    var columnData = ['id: ' + idGroupOrUser];
    for (var item in data) {
      category.push(data[item]);
      columnData.push(item);
    }
    console.log('columnData', columnData);
    console.log('category', category);
    var chart = c3.generate({
      bindto: '#repost .statistic',
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