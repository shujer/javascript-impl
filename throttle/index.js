/**
 * 节流：相当于稀释，连续触发, 每 n 毫秒内都生效一次
 * 场景：定时发送
 */
function throttle(fn, delay) {
  let hasRun = false;
  return function (...args) {
    let ctx = this;
    if (hasRun) return;
    hasRun = true;
    setTimeout(function () {
      fn.apply(ctx, args);
      hasRun = false;
    }, delay);
  };
}
