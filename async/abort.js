const wrapPromiseWithAbort = (promise) => {
  let _abort = () => {};
  let abortPromise = new Promise((_, reject) => {
    _abort = () => reject(new Error("manual abort"));
  });
  let promiseWithAbort = Promise.race([promise, abortPromise]);
  promiseWithAbort.abort = _abort;
  return promiseWithAbort;
};

// test
const timeoutPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("success");
  }, 300);
});

const testPromise = wrapPromiseWithAbort(timeoutPromise);
testPromise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
testPromise.abort();
