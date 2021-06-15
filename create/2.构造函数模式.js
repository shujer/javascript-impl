/**
 * 每个方法都要在实例上重新创建
 */
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}
var person1 = new Person("Greg", 27, "Doctor");
