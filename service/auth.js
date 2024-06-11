const jwt = require("jsonwebtoken");
const privateKey = "12345!@#$%";
// const sessionIdToUserMap = new Map();

async function setUser(user) {
  const { _id, email, role } = user;
  // sessionIdToUserMap.set(id, user);
  return jwt.sign({ _id, email,role }, privateKey);
}

function getUser(token) {
  // return sessionIdToUserMap.get(id);
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
