function instance_of(L, R) {
  let prototype = R.prototype;
  let proto = L.__proto__;
  while (true) {
    if (prototype === null || proto === null) return false;
    if (prototype === proto) return true;
    proto = proto.__proto__;
  }
  return false;
}
