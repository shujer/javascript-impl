/**
 * 防抖：连续触发之后的 n 毫秒内只生效一次
 * 场景：用户搜索框输入
 */
const debounce = (fn, duration = 100) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, duration);
  };
};

function debounce(fn, wait, leading) {
  var timeout;
  return function (...args) {
    var context = this;
    var later = function () {
      timeout = null;
      if (!leading) fn.apply(context, args);
    };
    var callNow = leading && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fn.apply(context, args);
  };
}
