var app = app || {};
var Backbone = Backbone || {};

app.getWallData = {
  defaultLimit: 100,
  offset: 0,
  getDataArray: function (id, limit, offset) {
    var promiseArray = [];
    return this.getCountMax(id).then(function (count) {
      for (var i = 0; i < count; i += limit) {
        var obj = {
          owner_id: id,
          count: limit,
          offset: offset + i
        };
        promiseArray.push(obj);
      }
      return promiseArray;
    });
  },
  getDataFromApi: function (idGroup) {
    var deferred = $.Deferred();
    var listPromise = this.getDataArray(idGroup, this.defaultLimit, this.offset);
    var arrData = [];
    listPromise.then(function (list) {
      var request = function () {
        if (list.length === 0) {
          console.log('arrData', arrData);
          deferred.resolve(arrData);
          return false;
        }
        var dataForRequest = list.splice(0, 1);
        var promiseList = dataForRequest.map(function (item) {
          return app.vk.getWall(item);
        });
        $.when.apply($, promiseList).then(function () {
          var result = Array.prototype.slice.call(arguments);
          result[0].response.map(function (item) {
            if (item.date) {
              arrData.push(item.date);
            } else {
              return false
            }
          });
          setTimeout(function () {
            request();
          }, 1000);
        });
      };
      request();
    });
    return deferred.promise();
  },
  getCountMax: function (id) {
    var countMax = 0;
    var url = app.vk.getWall({
      owner_id: id
    });
    return url.then(function (response) {
      return countMax = response.response[0];
    });
  }
};