var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "salebuddy",
  multipleStatements: true,
  connectionLimit: 100,
});
module.exports = pool;
