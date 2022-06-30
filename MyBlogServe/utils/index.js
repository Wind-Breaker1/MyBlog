const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
exports.hash = (myPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(myPassword, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      })
    })
  })
}
exports.compare = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      resolve(result)
    });

  })
}

exports.sign = (username) => {
  const privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_private_key.pem'))
  const token = jwt.sign({ username }, privateKey, { algorithm: 'RS256' });
  // console.log(token)
  return token;
}
exports.verify = (token) => {
  const publicKey = fs.readFileSync(path.join(__dirname, '../keys/rsa_public_key.pem'));
  const result = jwt.verify(token, publicKey);
  return result;
}
