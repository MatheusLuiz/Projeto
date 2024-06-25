const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  //password: '12345678',
  password: '1234',
  database: 'sistema',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
  }
  console.log('Conexão com o banco de dados foi realiada');

  // Libera a conexão após uso
  connection.release();
});


module.exports = pool.promise();