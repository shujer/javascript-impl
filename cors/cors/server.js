const http = require("http");

http
  .createServer((req, res) => {
    const url = req.url;
    console.log("request url：", url);
    if (url === "/api/simple") {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "http://127.0.0.1:3010",
      });
      return res.end("simple ok");
    }
    if (url === "/api/preflighted") {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "http://127.0.0.1:3010",
        "Access-Control-Allow-Headers": "Test-CORS, Content-Type",
        "Access-Control-Allow-Methods": "PUT,DELETE",
        "Access-Control-Max-Age": 86400,
        "Access-Control-Allow-Credentials": true,
      });
      return res.end("console.log('hello world!')");
    }
  })
  .listen(3011);

console.log("server listening on port", 3011);
