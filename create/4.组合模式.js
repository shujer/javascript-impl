/**
 * 原型模式用于定义方法和共享的属性
 * 构造函数用于定义实例属性
 */
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friedns = ["Shelby", "Court"];
}
// 重写原型对象切断现有原型与任何之前已存在的对象实例之间的联系
Person.prototype = {
  constructor: Person,
  sayName: function () {
    console.log(this.name);
  },
};
