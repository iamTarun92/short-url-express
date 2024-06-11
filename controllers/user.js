const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render("login", {
        error: "Invalid Username or Password",
      });
    }

    // const sessionId = uuidv4();
    const token = await setUser(user);
    // res.cookie("token", token, { httpOnly: true }); // Set the token as an HTTP-only cookie
    // return res.redirect("/");
    return res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
