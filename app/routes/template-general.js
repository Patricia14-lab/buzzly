const path = require("path");
const fs = require("fs");

function templateGeneral({ res, _filenameJSX }) {
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
  let filenameCSS = filenameJSX.replace(".jsx", ".css");
  if (!fs.existsSync(path.join(__dirname_index, "public", filenameCSS))) {
    filenameCSS = "";
  }
  const p = _template
    .replace(path.join(__dirname_index, "public"), "")
    .split(path.sep)
    .join("/");
  const info = {
    path: p,
    filenameJSX,
    filenameCSS,
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

module.exports = templateGeneral;
