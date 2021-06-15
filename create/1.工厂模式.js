/**
 * 解决创建多个相似对象的问题
 * 无法知道对象的类型
 */
function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  };
  return o;
}
