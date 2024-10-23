function routesAbsolute(app) {
  app.get("/", (req, res) => {
    return require("./template-general")({ res, _filenameJSX: "index.jsx" });
  });
}

module.exports = routesAbsolute;
