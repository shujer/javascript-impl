function outer() {
  let foo = "foo";
  return function inner() {
    return foo;
  };
}
console.dir(outer());

// 赋值
var fn;
function outer() {
  let foo = "foo";
  fn = function inner() {
    return foo;
  };
}
outer();
console.dir(fn);
