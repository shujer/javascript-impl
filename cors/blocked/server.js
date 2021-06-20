const http = require("http");

http
  .createServer((req, res) => {
    const url = req.url;
    console.log("request url：", url);
    if (url === "/api/data") {
      return res.end("ok");
    }
    if (url === "/script") {
      return res.end("console.log('hello world!')");
    }
  })
  .listen(3011);

console.log("server listening on port", 3011);
