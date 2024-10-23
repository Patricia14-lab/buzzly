require("dotenv").config();

require("./app/prototypes");
const sql = require("./app/sql-dynamic");

global.__dirname_index = __dirname;

const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));

app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));

require("./app/routes")(app);

server.listen(app.get("port"), () => {
  console.log("corriendo en el puerto:", app.get("port"));
});
