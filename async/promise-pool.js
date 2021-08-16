function promiseRequest(promiseFns, limit) {
  return new Promise((resolve, reject) => {
    let queue = [...promiseFns];
    let running = 0;
    let ans = new Array(promiseFns.length).fill(null);
    const run = () => {
      if (queue.length === 0 && running === 0) resolve(ans);
      if (running >= limit || queue.length == 0) {
        return;
      }
      const index = promiseFns.length - queue.length;
      const promiseFn = queue.shift();
      running++;
      promiseFn()
        .then((res) => {
          ans[index] = res;
          console.log("running", running, res);
        })
        .catch(() => {})
        .finally(() => {
          running--;
          run();
        });
    };
    for (let i = 0; i < promiseFns.length; i++) {
      run();
    }
  });
}

const makePromise = (value) => {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(value);
      }, 2000);
    });
};

const pool = promiseRequest(
  [makePromise(1), makePromise(2), makePromise(3), makePromise(4)],
  2
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
