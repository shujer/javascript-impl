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
const callback = (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res);
};

var Thunk = function (fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    };
  };
};

const thunkRequest = thunkfiy(request);
const req = thunkRequest("get", "http://example.com");
req(callback);
