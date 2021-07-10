function templateRender(template, dataSet) {
  const reg = /\{\{([\w]+)\}\}/g;
  return template.replace(reg, function (_match, name) {
    return dataSet[name];
  });
}

const template = `<div>
  <span>name:{{name}}</span>
  <span>age:{{age}}</span>
</div>`;
const dataSet = {
  name: "jane",
  age: 12,
};
let ans = templateRender(template, dataSet);
console.log(ans);
