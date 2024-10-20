const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));

server.listen(app.get("port"), () => {
  console.log("corriendo en el puerto:", app.get("port"));
});