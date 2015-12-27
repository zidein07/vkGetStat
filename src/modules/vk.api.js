var app = app || {};
var Backbone = Backbone || {};

app.vk = {
  apiLink: 'https://api.vk.com/method/',
  buildLink: function (method, params, token) {
    var tokenResult = "";
    var paramsResult = "";
    if (token) {
      tokenResult = token;
    } else {
      tokenResult = app.token.getToken();
    }
    if (params) {
      for (key in params) {
        if (params.hasOwnProperty(key)) {
          paramsResult += key + '=' + params[key] + '&';
        }
      }
      return this.apiLink + method + '?' + paramsResult + 'access_token=' + tokenResult;
    } else {
      return this.apiLink + method + '?access_token=' + tokenResult;
    }
  },
  getWall: function (params, token) {
    var url = this.buildLink('wall.get', params, token);
    return $.get(url);
  }
};