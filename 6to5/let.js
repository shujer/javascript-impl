const data = [1, 2, 3, 4];

// example 1
// es6
for (let i = 0; i < data.length; i++) {
  console.log(data[i]);
}
//es5
for (var _i = 0; _i < data.length; i++) {
  console.log(data[_i]);
}

// example 2
// es6
for (let i = 0; i < data.length; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}

// es5
function _loop(_i) {
  setTimeout(() => {
    console.log(_i);
  }, 100);
}
for (var _i = 0; _i < data.length; i++) {
  _loop(_i);
}
