const express = require("express");
const path = require("path");
const { connectMongoDb } = require("./connection");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const { mongoURI } = require("./config");
const { handelRedirectShortUrl } = require("./controllers/url");

const app = express();
const port = 3000;

connectMongoDb(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", staticRoute);
app.use("/url", urlRoute);
app.get("/:shortId", handelRedirectShortUrl);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
