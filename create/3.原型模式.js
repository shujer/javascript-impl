/**
 * 所有实例属性都是共享的，修改引用属性会导致所有实例的属性改变
 * 每创建一个函数就会同时创建它的 prototype 对象，这个对象也会自动获得 constructor 属性
 */
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 20;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
  console.log(this.name);
};
