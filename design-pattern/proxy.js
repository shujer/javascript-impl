/**
 * 实现可观察的数据
 */
const queueObservers = new Set();
const observable = (obj) =>
  new Proxy(obj, {
    set: (target, name, receiver) => {
      const result = Reflect.set(target, name, receiver);
      queueObservers.forEach((cb) => cb());
      return result;
    },
  });
const observe = (cb) => {
  queueObservers.add(cb);
};
const unobserve = (cb) => {
  queueObservers.delete(cb);
};

const obj = observable({
  name: "jane",
  age: 12,
});
observe(() => {
  console.log("before", obj.age);
});
obj.age = 13;
observe(() => {
  console.log("set1", obj.age);
});
obj.age = 14;
observe(() => {
  console.log("after", obj.age);
});
