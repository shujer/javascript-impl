// 异步请求
function request(method, url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.onload = function () {
    callback(null, xhr.responseText);
  };
  xhr.onerror = function (a, e) {
    callback(e);
  };
  xhr.send(null);
}

request("get", "http://example.com", (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res);
});

// 定时器

setTimeout(() => {
  console.log("1");
  setTimeout(() => {
    console.log("2");
    setTimeout(() => {
      console.log("3");
    }, 300);
  }, 200);
}, 100);

// Promise
const makePromise = (delay, res) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(res);
      resolve(res);
    }, delay);
  });
};
makePromise(100, "1")
  .then(() => makePromise(200, "2"))
  .then(() => makePromise(300, "3"));
