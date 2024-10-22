const debug = true;

const mysql = require("mysql");

const test = !global.runPrototypes;

if (test) {
  const path = require("path");
  require(path.resolve(__dirname, "../prototypes"));
  require("dotenv").config();
}

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
});

const [
  { CREATE_DATABASE, CREATE_TABLE, CHANGE_DATABASE, EXEC_QUERY },
  {
    GET_COLUMNS,
    GET_COLUMNS_TYPE,
    ADD_COLUMN,
    INSERT_OBJECT,
    EXISTS,
    CALC_TYPE,
  },
] = ["SQL", "TABLE"].map((n) => require(`./${n}`)(connection, debug));

connection.connect(async function (err) {
  if (err) {
    throw err;
  }
  console.log("SQL Connected!");
  if (test) {
    _test_();
    setTimeout(() => {
      console.log("Prueba terminada");
      connection.end();
    }, 1000);
  }
});

function _test_() {
  CREATE_DATABASE({ DATABASE: process.env.db });
  CHANGE_DATABASE({ DATABASE: process.env.db });
  CREATE_TABLE({ TABLE: "usuarios" });
  INSERT_OBJECT({
    TABLE: "usuarios",
    OBJECT: {
      id: 2,
      nombre: "Jeffrey123",
      password: "123abc",
      banned: false,
    },
  });
}

module.exports = {
  //----------------SQL
  CREATE_DATABASE,
  CREATE_TABLE,
  CHANGE_DATABASE,
  EXEC_QUERY,
  //----------------TABLE
  GET_COLUMNS,
  GET_COLUMNS_TYPE,
  ADD_COLUMN,
  INSERT_OBJECT,
  EXISTS,
  CALC_TYPE,
};
