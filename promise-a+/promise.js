// 参考：https://juejin.cn/post/6844904096525189128
const EnumStatus = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

const assp = (fn) => {
  setTimeout(fn, 0);
};

class MyPromise {
  // 内部状态
  status = EnumStatus.PENDING;
  // 当前值
  _value = undefined;
  // 当前错误
  _reason = undefined;
  // 成功的回调，通过 then 注册
  _resolveCallbacks = [];
  // 失败的回调，通过 then 注册
  _rejectedCallbakcs = [];
  // 初始化
  constructor(executor) {
    this._handleResolve = this._handleResolve.bind(this);
    this._handleReject = this._handleReject.bind(this);
    try {
      executor(this._handleResolve, this._handleReject);
    } catch (err) {
      this.reject(err);
    }
  }
  /**
   * @description 处理成功的回调
   * @param {any} value
   */
  _handleResolve(value) {
    const fn = () => {
      if (this.status !== EnumStatus.PENDING) return;
      this.status = EnumStatus.FULFILLED;
      this._value = value;
      while (this._resolveCallbacks.length) {
        let cb = this._resolveCallbacks.shift();
        cb(value);
      }
    };
    //兼容同步任务
    assp(fn);
  }

  /**
   * @description 处理失败回调
   * @param {Error} err
   */
  _handleReject(err) {
    const fn = () => {
      if (this.status !== EnumStatus.PENDING) return;
      this.status = EnumStatus.REJECTED;
      this._reason = err;
      while (this._rejectedCallbakcs.length) {
        let cb = this._rejectedCallbakcs.shift();
        cb(err);
      }
    };
    //兼容同步任务
    assp(fn);
  }

  /**
   * @param onFulfilled?: (value: any) => any
   * @param onRejected?: (reason: any) => PromiseLike<never>
   * @description  注册成功/失败的回调，支持链式调用
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.status === EnumStatus.FULFILLED) {
        onFulfilled(this._value);
        return;
      }
      if (this.status === EnumStatus.REJECTED) {
        onRejected(this._reason);
        return;
      }

      if (typeof onFulfilled !== "function") {
        onFulfilled = (val) => val;
      }
      if (typeof onRejected !== "function") {
        onRejected = (reason) => {
          throw new Error(reason instanceof Error ? reason.message : reason);
        };
      }
      // 处理链式调用
      const resolveFn = (value) => {
        try {
          const ret = onFulfilled(value);
          if (ret instanceof MyPromise) {
            ret.then(resolve, reject);
          } else {
            resolve(ret);
          }
        } catch (err) {
          reject(err);
        }
      };
      this._resolveCallbacks.push(resolveFn);
      // 处理链式调用
      const rejectFn = (value) => {
        try {
          const ret = onRejected(value);
          if (ret instanceof MyPromise) {
            ret.then(resolve, reject);
          } else {
            resolve(ret);
          }
        } catch (err) {
          reject(err);
        }
      };
      this._rejectedCallbakcs.push(rejectFn);
    });
  }
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    let len = promises.length;
    let result = new Array(len);
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, i) => {
        let p =
          promise instanceof MyPromise ? promise : MyPromise.resolve(promise);
        p.then(
          (value) => {
            len--;
            result[i] = value;
            if (len === 0) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }
}

const p1 = new MyPromise((resolve, reject) => {
  resolve(1);
});
const p2 = Promise.resolve(1);
const p3 = Promise.all([p1, p2]);
p3.then((res) => {
  console.log(res);
  return 2;
})
  .then((res) => {
    console.log(res);
    return new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(3);
      }, 1000);
    });
  })
  .then((res) => {
    console.log(res);
  });
