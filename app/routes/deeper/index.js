const path = require("path");

const DEEPEST = 10;
const PUBLIC = "public";

function deeper(app) {
  let pattern = "";
  for (let deep = 0; deep < DEEPEST; deep++) {
    pattern += `/:node${deep + 1}`;
    createGET({ app, pattern, deep });
  }
}

function createGET({ app, pattern, deep }) {
  app.get(pattern, (req, res) => {
    const nodes = cargarNodos({ req });
    const last = nodes.at(-1);
    const template = require("./inferred")({ nodes, last, public: PUBLIC });

    if (last === "index") {
      redundanciaIndex(nodes, res);
    } else if (template) {
      if (last == nodes.at(-2)) {
        redundanciaHomonima(nodes, res);
      } else {
        require("./processing")({ template, last, nodes, res });
      }
    } else {
      res.status(404);
      sendProcessStatic(["404.jsx"], res);
    }
  });

  function sendProcessStatic(routeArr, res) {
    const last = routeArr.at(-1);
    const template = path.join(__dirname_index, PUBLIC, ...routeArr);
    require("./processing")({
      template,
      last,
      nodes: [last],
      res,
    });
  }

  function redundanciaHomonima(nodes, res) {
    nodes.pop();
    res.redirect("/" + nodes.join("/"));
  }

  function redundanciaIndex(nodes, res) {
    nodes.pop();
    res.redirect("/" + nodes.join("/"));
  }

  function cargarNodos({ req }) {
    const retorno = [];
    for (let v = 0; v <= deep; v++) {
      retorno.push(req.params[`node${v + 1}`]);
    }
    return retorno;
  }
}

module.exports = deeper;
