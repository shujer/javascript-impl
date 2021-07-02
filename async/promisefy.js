function promisefy(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const _cb = function (err, value) {
        if (err) {
          reject(err);
        }
        resolve(value);
      };
      fn.call(this, ...args, _cb);
    });
  };
}

const timeout = (delay, cb) => {
  setTimeout(() => {
    cb(null, new Date());
  }, delay);
};

const timeoutPromise = promisefy(timeout);

timeoutPromise(200).then((vale) => {
  console.log(vale);
});
