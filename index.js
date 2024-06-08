const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./connection");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const { mongoURI } = require("./config");

const app = express();
const port = 3000;

connectMongoDb(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/", checkAuth, staticRoute);
app.use("/urls", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
