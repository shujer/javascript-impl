// class Person {
//   constructor(name) {
//     this.name = name;
//   }
// }
// class Student extends Person {
//   constructor(name) {
//     super(name);
//     this.stuName = name;
//   }
// }

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Person = function (name) {
  if (!this instanceof Person) {
    throw new TypeError("Cannot call a class as a function");
  }
  _defineProperty(this, "name", name);
  this.name = name;
};

function Student(name) {
  if (!(this instanceof Student)) {
    throw new TypeError("Cannot call a class as a function");
  }
  Person.call(this, name);
  _defineProperty(this, "stuName", name);
  this.stuName = name;
}

Student.prototype = Object.create(Person.prototype, {
  constructor: { value: Student, writable: true, configurable: true },
});

Object.setPrototypeOf(Student, Person);

// test
let stu = new Student("ki");
console.log(stu.name, stu.stuName, Object.getPrototypeOf(Student) === Person);
