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
    app.getWallData.getDataFromApi(params.wallId).then(function (response) {
      response.forEach(function (item) {
        var postData = self.dataPost(item.likes.count, item.reposts.count, item.comments.count);
        if (params.sortType === 'like') {

          console.log('postData.like', postData.like);
        }
      });
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
  }
});