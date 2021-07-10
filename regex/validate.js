// 至少8个字符，至少1个大写字母，1个小写字母和1个数字
function passwordValidator(password) {
  const reg = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\s\S]{8,}/g;
  return reg.test(password);
}
console.log(passwordValidator("1234"));
console.log(passwordValidator("abc"));
console.log(passwordValidator("123Ab"));
console.log(passwordValidator("123Abccccc"));
