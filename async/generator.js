function* myGenerator() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
  yield Promise.resolve(4);
}

// 普通执行
function next(gen) {
  const { value, done } = gen.next();
  if (done) {
    return value;
  }
  value.then((val) => {
    console.log(val);
    next(gen);
  });
}
next();

// 兼容
function run(gen) {
  return new Promise((resolve, reject) => {
    let g = gen();
    function _next(val) {
      let res;
      try {
        res = g.next(val);
      } catch (err) {
        return reject(err);
      }
      if (res.done) {
        return resolve(res.value);
      }
      Promise.resolve(res.value).then(
        (val) => {
          console.log(val);
          _next(val);
        },
        (err) => {
          g.throw(err);
        }
      );
    }
    _next(g);
  });
}
run(myGenerator);
