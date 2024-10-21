const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "buzzly",
});

con.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected!");
  CrearTablas();
});

function CrearTablas() {
    const sql = `CREATE TABLE IF NOT EXISTS usuarios (
                    id INT AUTO_INCREMENT PRIMARY KEY
                );`;

    con.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("Table created");
    });
}

function insertarObjeto ({TABLE, OBJECT}){
    if(!TABLE || !OBJECT){
        throw "faltan datos para insertar objeto"

    }
    const query = `INSERT INTO`
}



