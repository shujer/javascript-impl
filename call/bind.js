var _globalThis = this;

Function.prototype.myBind = function (ctx, ...args) {
  let context = ctx || _globalThis;
  if (typeof context !== "object" && typeof context !== "function") {
    context = Object(context);
  }
  let fnKey = Symbol("fn");
  context[fnKey] = this;
  return function (...rest) {
    const result = context[fnKey](...args, ...rest);
    delete context[fnKey];
    return result;
  };
};

// test

var foo = {
  val: 1,
};

function bar(...args) {
  console.log(this.val, ...args);
}

const bindBar = bar.bind(foo);

bindBar("a", "b", "c");
