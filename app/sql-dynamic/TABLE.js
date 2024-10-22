let debug = false;

let connection;
let EXEC_QUERY;

function GET_COLUMNS({ TABLE }) {
  return new Promise((resolve, reject) => {
    const query = `SHOW COLUMNS FROM ${TABLE}`;
    connection.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      const columnNames = results.map((column) => column.Field);
      resolve(columnNames);
    });
  });
}

function GET_COLUMNS_TYPE({ TABLE }) {
  return new Promise((resolve, reject) => {
    const query = `SHOW COLUMNS FROM ${TABLE}`;
    connection.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      const retorno = {};
      results.forEach((column) => {
        retorno[column.Field] = column.Type.toUpperCase();
      });
      resolve(retorno);
    });
  });
}

async function ADD_COLUMN({ TABLE, COLUMN, TYPE }) {
  const query = `ALTER TABLE ${TABLE} ADD COLUMN ${COLUMN} ${TYPE}`;
  if (debug) {
    console.log(query);
  }
  await EXEC_QUERY({
    QUERY: query,
    MSG: `Column added to ${TABLE}, ${COLUMN} ${TYPE}`,
  });
  const query2 = `FLUSH TABLES ${TABLE}`;
  await EXEC_QUERY({ QUERY: query2, MSG: `Table flush` });
}

async function INSERT_OBJECT({ TABLE, OBJECT }) {
  if (!TABLE || !OBJECT) {
    throw "faltan datos para insertar objeto";
  }
  for (let k of Object.keys(OBJECT)) {
    k = k.SNAKE_CASE();
    const columns = await GET_COLUMNS({ TABLE });
    if (!columns.includes(k)) {
      let type = CALC_TYPE({ DATA: OBJECT[k] });
      await ADD_COLUMN({ TABLE, COLUMN: k, TYPE: type });
    }
  }
  const exists = await EXISTS({
    TABLE,
    ID: OBJECT.getSNAKE_KEY("ID"),
  });

  const query = await (async () => {
    if (exists) {
      const types = await GET_COLUMNS_TYPE({ TABLE });
      return `UPDATE ${TABLE} SET ${Object.keys(OBJECT)
        .map((key) => {
          const K = key.SNAKE_CASE();
          let V = OBJECT.getSNAKE_KEY(key);
          if (types[K] && types[K].includes("TEXT")) {
            V = `'${V.toString()}'`;
          }
          return `${K} = ${V}`;
        })
        .join(", ")} WHERE ID = ${OBJECT.getSNAKE_KEY("ID")}`;
    }
    return `INSERT INTO ${TABLE} (${Object.keys(OBJECT)
      .map((k) => k.SNAKE_CASE())
      .join(", ")}) VALUES (${Object.values(OBJECT)
      .map((k) =>
        CALC_TYPE({ DATA: k }).includes("TEXT") ? `'${k.toString()}'` : k
      )
      .join(", ")});`;
  })();
  await EXEC_QUERY({ QUERY: query, MSG: `Object inserted into ${TABLE}` });
}

async function EXISTS({ ID, TABLE }) {
  if (!ID) {
    return false; //No hay ID para comparar
  }
  if (!TABLE) {
    throw "falta tabla para validar existencia";
  }
  return new Promise((resolve, reject) => {
    const query = `SELECT 1 FROM ${TABLE} WHERE id = ${ID} LIMIT 1`;
    connection.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.length > 0);
    });
  });
}

function CALC_TYPE({ DATA }) {
  switch (typeof DATA) {
    case "number":
      return "FLOAT";
    case "boolean":
      return "TEXT";
    default:
      return "TEXT";
  }
}

async function DELETE_ROW({TABLE, ID}){
  const query = `DELETE FROM ${TABLE} WHERE ID = ${ID};`;

  await EXEC_QUERY({
    QUERY: query,
    MSG: `Row delete in ${TABLE} with ID ${ID}`,
  });
}

async function READ_ROW({TABLE, ID}){
  const query = `SELECT * FROM ${TABLE} WHERE ID = ${ID};`;
  
  return await EXEC_QUERY({
    QUERY: query,
    MSG: `Row read in ${TABLE} with ID ${ID}`,
  });
}


module.exports = (_con, _debug) => {
  connection = _con;
  debug = _debug;
  EXEC_QUERY = require("./SQL")(connection, debug).EXEC_QUERY;
  return {
    GET_COLUMNS,
    GET_COLUMNS_TYPE,
    ADD_COLUMN,
    INSERT_OBJECT,
    EXISTS,
    CALC_TYPE,
    DELETE_ROW,
    READ_ROW
  };
};


