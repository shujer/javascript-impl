function isPromise(promise) {
  return promise && Object.prototype.toString.call(promise).includes("Promise");
}
function myRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((_promise) => {
      let promise = isPromise(_promise) ? _promise : Promise.resolve(_promise);
      promise
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

function makePromise(value, delay, err) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value) resolve(value);
      else reject(err);
    }, delay);
  });
}
const p1 = [makePromise(12, 200), makePromise(11, 100), makePromise(10, 50)];
const p2 = [
  makePromise(null, 200, 12),
  makePromise(null, 100, 12),
  makePromise(null, 50, 10),
];
myRace(p1)
  .then((values) => {
    console.log("resolve", values);
  })
  .catch((err) => {
    console.log("reject", err);
  });
myRace(p2)
  .then((values) => {
    console.log("resolve", values);
  })
  .catch((err) => {
    console.log("reject", err);
  });
