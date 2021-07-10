class PubSub {
  subs = {};
  on(eventName, cb) {
    if (!this.subs[eventName]) {
      this.subs[eventName] = [];
    }
    this.subs[eventName].push(cb);
  }

  emit(eventName) {
    if (this.subs[eventName]) {
      this.subs[eventName].forEach((cb) => {
        cb();
      });
    }
  }

  off(eventName, cb) {
    if (this.subs[eventName]) {
      this.subs[eventName].splice(this.subs[eventName].indexOf(cb), 1);
    }
  }
}

let ps = new PubSub();
let cb1 = () => {
  console.log("a1");
};
let cb2 = () => {
  console.log("a2");
};
let cb3 = () => {
  console.log("b1");
};
ps.on("a", cb1);
ps.on("a", cb2);
ps.on("b", cb3);
ps.emit("a");
// window.ps = ps;
