const mysql = require('mysql2/promise');
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'gestepi_db',
  port: 3306
});

module.exports = db;
