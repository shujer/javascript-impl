function getPrototypeOf(obj) {
  if (typeof Object.getPrototypeOf === "function") {
    return Object.getPrototypeOf(obj);
  }
  return obj.__proto__;
}

function myInstanceOf(L, R) {
  // 实例的原型
  let proto = getPrototypeOf(L),
    // 构造函数的原型
    prototype = R.prototype;
  while (true) {
    if (!proto) {
      return false;
    }
    if (proto === prototype) {
      return true;
    }
    proto = getPrototypeOf(proto);
  }
}

// test
function Person() {}
const person = new Person();
console.log(
  myInstanceOf(person, Person),
  myInstanceOf(person, Object),
  myInstanceOf(person, Function)
);
