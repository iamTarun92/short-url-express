const jwt = require("jsonwebtoken");
const privateKey = "12345!@#$%";

async function setUser(user) {
  const { _id, email, role } = user;
  return jwt.sign({ _id, email,role }, privateKey);
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, privateKey);
  } catch(error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
