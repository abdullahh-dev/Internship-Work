require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECERET_STRING;
const JWT_EXPIRY = process.env?.JWT_EXPIRY;
function setToken(newUser) {
  return jwt.sign(
    {
      _id: newUser?._id.toString(),
      email: newUser?.email,
    },
    secret,
    {
      expiresIn: JWT_EXPIRY,
    }
  );
}
function getToken(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}
module.exports = { setToken, getToken };
