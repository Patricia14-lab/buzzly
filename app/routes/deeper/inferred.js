const path = require("path");
const fs = require("fs");

const EXTENSIONS_SUPPORTED_RENDER = ["html", "ejs", "jsx"];

function inferred({ nodes, last, public }) {
  nodes = [...nodes];
  for (const ext of EXTENSIONS_SUPPORTED_RENDER) {
    const params = { ext, nodes, last, public };
    const inferred = extension(params) ?? index(params) ?? homonim(params);
    if (inferred) {
      return inferred;
    }
  }
  return simple({ routeArr: nodes, public });
}

function index({ nodes, ext, public }) {
  const routeIndex = [...nodes, `index.${ext}`];
  return routeExists({ routeArr: routeIndex, public });
}

function homonim({ nodes, ext, public, last }) {
  const routeHomonim = [...nodes, `${last}.${ext}`];
  return routeExists({ routeArr: routeHomonim, public });
}

function extension({ nodes, ext, public }) {
  const nodext = [...nodes];
  const lastext = `${nodext.pop()}.${ext}`;
  nodext.push(lastext);
  return routeExists({ routeArr: nodext, public });
}

function simple({ routeArr, public }) {
  return routeExists({ routeArr, public });
}

function routeExists({ routeArr, public }) {
  let ruta = path.join(__dirname_index, public, ...routeArr);
  if (fs.existsSync(ruta)) {
    return ruta;
  }
}

module.exports = inferred;
