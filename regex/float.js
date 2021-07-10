function formatFloat(num) {
  let str = num + "";
  return str.replace(/(\d)(?=(\d{3})+\.)/g, function ($1, $2, $3) {
    console.log($1, $2, $3);
    return $2 + ",";
  });
}

console.log(formatFloat("123456.12"));
