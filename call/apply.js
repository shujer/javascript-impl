var _globalThis = this;

Function.prototype.myApply = function (ctx, args) {
  let context = ctx || _globalThis;
  if (typeof context !== "function" && typeof context !== "object") {
    context = Object(context);
  }
  const fnKey = Symbol("fn");
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};
// test
var foo = {
  val: 1,
};

function bar(name) {
  console.log(this.val, name);
}
bar.myApply(foo, ["test"]);
