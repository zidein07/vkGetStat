var app = app || {};
var Backbone = Backbone || {};

app.tpl = {
  index: function (context) {
    return this.getTpl(context, '#index');
  },
  statisticDataWall: function (context) {
    return this.getTpl(context, '#statisticDataWall');
  },
  sortWallVk: function (context) {
    return this.getTpl(context, '#sortWallVk');
  },
  menuTpl: function (context) {
    return this.getTpl(context, '#menuTpl');
  },
  tplForPost: function (context) {
    return this.getTpl(context, '#tplForPost');
  },
  getTpl: function (context, selector) {
    var source = $(selector).html();
    var template = Handlebars.compile(source);
    return template(context);
  }
};