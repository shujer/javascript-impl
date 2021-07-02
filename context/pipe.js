var data = [
  { userId: 8, title: "title1" },
  { userId: 11, title: "other" },
  { userId: 15, title: null },
  { userId: 19, title: "title2" },
];
var find = function (origin) {
  if (!(this instanceof find)) {
    return new find(origin);
  }
  this.origin = [...origin];
  return this;
};
find.prototype.where = function (query) {
  this.origin = this.origin.filter((obj) =>
    Object.entries(query).every(([key, reg]) => reg.test(obj[key]))
  );
  return this;
};

find.prototype.orderBy = function (key, order) {
  return this.origin.sort(({ [key]: a }, { [key]: b }) =>
    order === "desc" ? b - a : order === "asc" ? a - b : 0
  );
};
// 查找 data 中，符合条件的数据，并进行排序
var result = find(data)
  .where({
    title: /\d$/,
  })
  .orderBy("userId", "asc");

console.log(result);
