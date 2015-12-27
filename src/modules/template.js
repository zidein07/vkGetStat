var app = app || {};
var Backbone = Backbone || {};

app.tpl = {
  stat: function (context) {
    return this.getTpl(context, '#stat');
  },
  getTpl: function (context, selector) {
    var source = $(selector).html();
    var template = Handlebars.compile(source);
    return template(context);
  }
};