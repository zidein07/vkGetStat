var app = app || {};
var Backbone = Backbone || {};

app.tpl = {
  tabs: function (context) {
    return this.getTpl(context, '#tabs');
  },
  getTpl: function (context, selector) {
    var source = $(selector).html();
    var template = Handlebars.compile(source);
    return template(context);
  }
};