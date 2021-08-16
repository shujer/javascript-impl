function promiseRetry(promiseFn, limit) {
  return new Promise((resolve, reject) => {
    const attempt = (limit) => {
      promiseFn()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          if (limit <= 0) {
            reject(err);
          } else {
            attempt(--limit);
          }
        });
    };
    attempt(limit);
  });
}

let sum = 0;
const timeout = () => {
  return new Promise((resolve, reject) => {
    console.log(sum);
    setTimeout(() => {
      reject(sum++);
    }, 400);
  });
};

const result = promiseRetry(timeout, 10).catch((err) => {
  console.log("err", err);
});
