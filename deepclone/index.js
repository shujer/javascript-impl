const checkObject = (obj) => {
  const match = Object.prototype.toString.call(obj).match(/\[object (.*)\]/);
  return match && match[1];
};

const isObject = (str) => {
  return str === "Object" || str === "Array";
};

const deepClone = (obj) => {
  let type = checkObject(obj);
  if (!(type === "Object" || type === "Array")) {
    return obj;
  }
  let newObj = type === "Object" ? Object.create(null) : new Array();
  for (let name in obj) {
    if (obj.hasOwnProperty(name)) {
      newObj[name] = deepClone(obj[name]);
    }
  }
};
