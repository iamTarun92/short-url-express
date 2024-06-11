const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  // const token = req.cookies?.token;
  const token = req.headers["authorization"].split("Bearer ")[1];
  if (!token) return res.redirect("/login");
  const user = getUser(token);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  // const token = req.cookies?.token;
  const token = req.headers["authorization"].split("Bearer ")[1];
  const user = getUser(token);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
