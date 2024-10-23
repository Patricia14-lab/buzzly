console.log("routes generated.");

const fs = require("fs");
const path = require("path");
const deepest = 10;

function pathInferred({ nodes, last }) {
  nodes = [...nodes];

  for (const ext of ["html", "ejs", "jsx"]) {
    const inferred =
      extensionInferred(ext) ?? indexInferred(ext) ?? homonimInferred(ext);
    if (inferred) {
      return inferred;
    }
  }
  return loadFile();

  function indexInferred(ext) {
    const routeHomonim = [...nodes, `index.${ext}`];
    let ruta = path.join(__dirname_index, "public", ...routeHomonim);
    if (fs.existsSync(ruta)) {
      return ruta;
    }
  }

  function homonimInferred(ext) {
    const routeHomonim = [...nodes, `${last}.${ext}`];
    let ruta = path.join(__dirname_index, "public", ...routeHomonim);
    if (fs.existsSync(ruta)) {
      return ruta;
    }
  }

  function loadFile() {
    let ruta = path.join(__dirname_index, "public", ...nodes);
    if (fs.existsSync(ruta)) {
      return ruta;
    }
  }

  function extensionInferred(ext) {
    const nodext = [...nodes];
    const lastext = `${nodext.pop()}.${ext}`;
    nodext.push(lastext);
    let ruta = path.join(__dirname_index, "public", ...nodext);
    if (fs.existsSync(ruta)) {
      return ruta;
    }
  }
}

function loadBuzzlyTemplate(res, _filenameJSX) {
  const buzztemplate = ["src", "ejs", "buzzly-template.ejs"];
  const _deep = buzztemplate.length;
  const upDir = Array.from({ length: _deep - 1 })
    .map((e) => "../")
    .join("");
  const _template = path.join(__dirname_index, "public", ...buzztemplate);
  const user = {};
  const logged = !!user;
  const filenameJSX = _filenameJSX
    .replace(path.join(__dirname_index, "public"), "")
    .split(path.sep)
    .join("/");
  const info = {
    path: _template,
    filenameJSX,

    deep: _deep,
    upDir,
    user,
    logged,
  };
  const variables = {
    info: JSON.stringify(info),
    ...info,
  };
  return res.render(_template, variables);
}

function routesAbsolute(app) {
  app.get("/", (req, res) => {
    loadBuzzlyTemplate(res, "index.jsx");
  });
}

function routesDeeper(app) {
  let deep = "";
  for (let d = 0; d < deepest; d++) {
    deep += `/:node${d + 1}`;
    app.get(deep, (req, res) => {
      const nodes = [];
      cargarNodos();
      const last = nodes[nodes.length - 1];
      const template = pathInferred({ nodes, last });
      if (template) {
        if (last == "index") {
          nodes.pop();
          return res.redirect("/" + nodes.join("/"));
        }
        if (template.endsWith(".json")) {
          return res.json(template);
        }
        if (template.endsWith(".jsx")) {
          console.log(template);
          loadBuzzlyTemplate(res, template);
        }
        if (template.endsWith(".ejs")) {
          const _deep = d + 1;
          const upDir = Array.from({ length: _deep })
            .map((_) => "../")
            .join("");
          const user = {};
          const logged = !!user;
          const _template = template
            .replace(__dirname_index, "")
            .split(path.sep)
            .filter(Boolean);
          if (_template[0] == "public") {
            _template.shift();
          }
          const filename = _template.at(-1);
          const extension = filename.split(".").pop();
          const filenameJSX = filename.replace(extension, "jsx");
          const info = {
            path: _template,
            filename,
            extension,
            filenameJSX,

            deep: _deep,
            upDir,
            user,
            logged,
          };
          const variables = {
            info: JSON.stringify(info),
            ...info,
          };
          return res.render(template, variables);
        }
        return res.sendFile(template);
      } else {
        return res.send("404 Not Found");
      }

      function cargarNodos() {
        for (let v = 0; v <= d; v++) {
          nodes.push(req.params[`node${v + 1}`]);
        }
      }
    });
  }
}

module.exports = (app) => {
  routesAbsolute(app);
  routesDeeper(app);
};
