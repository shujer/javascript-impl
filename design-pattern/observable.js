class Observable {
  constructor() {
    this.queueObservers = new Set();
  }
  subscrible(observer) {
    this.queueObservers.add(observer);
  }
  unsubscrible(observer) {
    this.queueObservers.delete(observer);
  }
  next() {
    this.queueObservers.forEach((observer) => {
      observer.next && observer.next();
    });
  }
}

const obj = new Observable();
const observer1 = {
  next() {
    console.log("observer1");
  },
};

const observer2 = {
  next() {
    console.log("observer2");
  },
};
obj.subscrible(observer1);
obj.subscrible(observer2);
obj.next();
obj.unsubscrible(observer2);
obj.next();
