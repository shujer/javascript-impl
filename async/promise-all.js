function isPromise(promise) {
  return promise && Object.prototype.toString.call(promise).includes("Promise");
}

var myAll = function (promises) {
  let count = promises.length;
  let ans = [];
  if (count === 0) return Promise.resolve([]);
  return new Promise((resolve, reject) => {
    promises.forEach((_promise, i) => {
      let promise = isPromise(_promise) ? _promise : Promise.resolve(_promise);
      promise
        .catch((err) => {
          reject(err);
        })
        .then((val) => {
          ans[i] = val;
          if (--count === 0) resolve(ans);
        });
    });
  });
};

// test
const p1 = [Promise.resolve(12), Promise.resolve(11), Promise.resolve(10)];
const p2 = [Promise.resolve(12), Promise.reject(11), Promise.resolve(10)];
myAll(p1)
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log(err);
  });
myAll(p2)
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log(err);
  });
