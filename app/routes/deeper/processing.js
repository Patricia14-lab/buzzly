const fs = require("fs");

function processing(params) {
  const result =
    processingJSON(params) ??
    processingJSX(params) ??
    processingEJS(params) ??
    processingDefault(params);

  return result;
}

function processingDefault({ template, res }) {
  if (!res.headersSent) {
    res.sendFile(template);
  }
}

function processingEJS({ template, last, nodes, res }) {
  if (template.endsWith(".ejs") && !res.headersSent) {
    const _deep = nodes.length + 1;
    const upDir = Array.from({ length: _deep })
      .map(() => "../")
      .join("");
    const user = {};
    const logged = !!user;
    const _template = template
      .replace(__dirname + "/index", "")
      .split(path.sep)
      .filter(Boolean);
    if (_template[0] === PUBLIC) {
      _template.shift();
    }
    const filename = _template.at(-1);
    const extension = filename.split(".").pop();
    const filenameJSX = filename.replace(`.${extension}`, ".jsx");
    const filenameCSS = filename.replace(`.${extension}`, ".css");
    if (!fs.existsSync(filenameCSS)) {
      filenameCSS = "";
    }
    const info = {
      path: _template,
      filename,
      extension,
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
    res.render(template, variables);
  }
}

function processingJSX({ template, res }) {
  if (template.endsWith(".jsx") && !res.headersSent) {
    require("../template-general")({ res, _filenameJSX: template });
  }
}

function processingJSON({ template, res }) {
  if (template.endsWith(".json") && !res.headersSent) {
    res.json(template);
  }
}

module.exports = processing;
