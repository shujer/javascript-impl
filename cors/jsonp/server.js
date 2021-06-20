const http = require("http");

const parse = (path = "") => {
  return path.split("&").reduce((acc, patten) => {
    const [k, v] = patten.split("=");
    acc[k] = v;
    return acc;
  }, {});
};

http
  .createServer((req, res) => {
    const [url, path] = req.url.split("?");
    console.log("request url：", url);
    const query = parse(path);
    if (url === "/script") {
      let { callback } = query;
      let data = { code: 0, data: [10, 20] };
      let str = `${callback}(${JSON.stringify(data)})`;
      return res.end(str);
    }
  })
  .listen(3011);

console.log("server listening on port", 3011);
