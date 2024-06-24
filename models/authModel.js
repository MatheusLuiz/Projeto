const db = require('../config/banco');

async function findByUsernameAndPassword(username, password) {
  const query = 'SELECT username, password FROM logins WHERE username = ? AND password = ?';
  const [rows] = await db.execute(query, [username, password]);
  return rows[0];
}

module.exports = { findByUsernameAndPassword };