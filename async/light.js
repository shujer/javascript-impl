const timeout = ({ delay, color }, cb) => {
  setTimeout(() => {
    cb(null, color);
  }, delay);
};

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

const timeoutPromise = promisefy(timeout);
const args = [
  { delay: 1000, color: "red" },
  { delay: 2000, color: "green" },
  { delay: 4000, color: "yellow" },
];

const run = async () => {
  const promises = args.map((param) => timeoutPromise(param));
  for await (let value of promises) {
    console.log(value);
  }
  run();
};
run();
