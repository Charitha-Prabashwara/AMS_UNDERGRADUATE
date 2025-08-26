const bcrypt = require('bcrypt');
const config = require('./Config');

async function hashPassword(password) {
  const hashed = await bcrypt.hash(password,Number(config.SLAT_ROUNDS));
  return hashed;
}

module.exports = hashPassword;