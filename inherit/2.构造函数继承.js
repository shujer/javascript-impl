/**
 * 借用构造函数
 */
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
function SubType(age) {
  // 继承父类，同时传递参数
  SubType.call(this, "Nicholas");
  // 实例属性
  this.age = age;
}
