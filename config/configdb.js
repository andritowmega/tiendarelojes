const mysql = require("mysql2");
// create the pool
module.exports = () => {
  const pool = mysql.createPool({
    host: "213.190.6.150",
    user: "u476667723_proyecto",
    database: "u476667723_proyecto",
    password: "Trabajo2021%",
    port:3306
  });
  return pool;
};