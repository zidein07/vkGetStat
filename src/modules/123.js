var AjaxParallelHelper = function (options) {
  options = options || {};
  this.promises = options.promises || [];
  this.timeout = options.timeout || 2000;
  this.pullSize = options.pullSize || 5;
};
AjaxParallelHelper.prototype.run = function () {
  console.log('this.timeout', this.timeout);
  console.log('this.pullSize', this.pullSize);
  var deferred = $.Deferred();
  if (5 === 5) {
    setTimeout(function () {
      deferred.resolve("success");
    }, this.timeout);
  } else {
    deferred.reject("error");
  }
  return deferred.promise();
};
var aph = new AjaxParallelHelper({
  promises: [],
  timeout: 1000,
  pullSize: 3
});
aph.run().then(function (response) {
  console.log('response', response);
}, function (responseReject) {
  console.log('responseReject', responseReject);
});