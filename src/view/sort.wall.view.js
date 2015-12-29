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
    app.getWallData.getDataFromApi(params.wallId).then(function (responseList) {
      var sortResponse = self.sortData(responseList, params.sortType);
      console.log('Количество постов: ', sortResponse.length);
      var html = '';
      sortResponse.map(function (item) {
        var likeCount = item.likes.count;
        var reports = item.reposts.count;
        var comments = item.comments.count;
        var text = item.text;
        var photoImg = '';
        var photoStatus = false;
        if (!_.isUndefined(item.attachment)) {
          if (!_.isUndefined(item.attachment.photo)) {
            photoStatus = true;
            photoImg = item.attachment.photo.src_big;
          }
        }
        html += app.tpl.tplForPost({
          likes: likeCount,
          reports: reports,
          comments: comments,
          text: text,
          imgSrc: photoImg,
          photoStatus: photoStatus
        });
      });
      $('.posts').html(html);
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
  sortData: function (arrItem, sortType) {
    return _.sortBy(arrItem, function (item) {
      return -item[sortType].count;
    });
  }
});