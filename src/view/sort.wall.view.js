var app = app || {};
var Backbone = Backbone || {};

app.wallSortView = Backbone.View.extend({
  el: '.container',
  events: {
    'click #searchData': 'renderData'
  },
  initialize: function () {

  },
  render: function () {
    app.loader.show();
    var html = app.tpl.sortWallVk();
    $('.content').html(html);
    app.loader.hide();
  },
  renderData: function () {
    var self = this;
    var params = this.getParams();
    var wallDataArray = [];
    app.getWallData.getDataFromApi(params.wallId).then(function (response) {
      var sortResponse = [];
      response.forEach(function (item) {
        wallDataArray.push(item);
      });
      sortResponse = self.sortData(wallDataArray, params.sortType);
      console.log('sortResponse', sortResponse);
    });
  },
  getParams: function () {
    var period = $('#period').val();
    var sortType = $('#sortType').val();
    var getIdWall = $('#getIdWall').val();
    return {
      period: period,
      sortType: sortType,
      wallId: getIdWall
    };
  },
  dataPost: function (like, repost, comment) {
    return {
      like: like,
      repost: repost,
      comment: comment
    };
  },
  sortData: function (arrItem, select) {
    if (select === 'like') {
      return arrItem.sort(function (a, b) {
        return a.likes.count > b.likes.count;
      });
    } else if (select === 'repost') {
      return arrItem.sort(function (a, b) {
        return a.reposts.count > b.reposts.count;
      });
    } else if (select === 'comments') {
      return arrItem.sort(function (a, b) {
        return a.comments.count > b.comments.count;
      });
    }
  },
  chooseData: function (paramsSelect) {

  }
});