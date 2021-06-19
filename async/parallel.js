const timeout = (i) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, i);
  });

const asyncPool = async (poolLimit, array, iteratorFn) => {
  const dones = [];
  const runnings = [];
  for (let item of array) {
    const promise = Promise.resolve().then(() => iteratorFn(item, array));
    dones.push(promise);
    if (poolLimit <= array.length) {
      const r = promise.then(() => runnings.splice(runnings.indexOf(r), 1));
      runnings.push(r);
      if (runnings.length >= poolLimit) {
        await Promise.race(runnings);
      }
    }
  }
  return Promise.all(dones);
};
const test = async () => {
  await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
};
test();
