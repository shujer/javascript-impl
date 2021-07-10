/**
 * 方法一：提供静态访问方法
 */
// es5
function Singleton(name) {
  this.name = name;
}
Singleton.getInstance = (function () {
  let _instance = null;
  return function (name) {
    if (!_instance) {
      _instance = new Singleton(name);
    }
    return _instance;
  };
})();

//  es6
class Singleton {
  constructor(name) {
    this.name = name;
  }
  static getInstance(name) {
    if (!this._instance) {
      this._instance = new Singleton(name);
    }
    return this._instance;
  }
}
let a = Singleton.getInstance("a");
let b = Singleton.getInstance("b");
console.log(a === b);

/**
 * 方法二：透明的单例模式
 */
// ES5
var Singleton = (function () {
  let _instance = null;
  return function (name) {
    if (_instance) {
      return _instance;
    }
    this.name = name;
    _instance = this;
    return _instance;
  };
})();

// es6
class Singleton {
  constructor(name) {
    if (!Singleton._instance) {
      this.name = name;
      Singleton._instance = this;
    }
    return Singleton._instance;
  }
}
let a = new Singleton("a");
let b = new Singleton("b");
console.log(a === b, a.name, b.name);
