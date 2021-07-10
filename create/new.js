/**
 * new 操作符的工作：
 * 创建一个新对象
 * 将构造函数的作用域赋给新对象（this 指向新对象）
 * 执行构造函数中的代码（为新对象添加属性）
 * 返回新对象
 */
function create() {
  let obj = null;
  let result = null;
  let Con = Array.prototype.shift.call(arguments);
  if (typeof Con !== "function") {
    throw TypeError("invalid constructor");
  }
  obj = Object.create(Con.prototype);
  result = Con.apply(obj, arguments);
  return result && (typeof result === "object" || typeof result === "function")
    ? result
    : obj;
}
