/**
 * new 操作符的工作：
 * 创建一个新对象
 * 将构造函数的作用域赋给新对象（this 指向新对象）
 * 执行构造函数中的代码（为新对象添加属性）
 * 返回新对象
 */
function create(ctx) {
  let obj = new Object();
  let Con = [].shift.call(arguments);
  obj.__proto__ = Con.prototype;
  let result = Con.apply(obj, arguments);
  return typeof result === "object" ? result : obj;
}
