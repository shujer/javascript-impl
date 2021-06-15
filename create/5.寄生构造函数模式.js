/**
 * 构造函数在不返回值的情况下，默认会返回新对象实例
 * 通常用于封装、重写构造函数
 */
function SpecialArray() {
  var values = new Array();
  values.push.apply(values, arguments);
  values.toPipedString = function () {
    return this.join("|");
  };
  return values;
}
var colors = new SpecialArray("red", "blue", "green");
