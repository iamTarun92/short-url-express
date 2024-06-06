const express = require("express");
const { connectMongoDb } = require("./connection");
const urlRoute = require("./routes/url");
const { mongoURI } = require("./config");
const { handelRedirectShortUrl } = require("./controllers/url");

const app = express();
const port = 3000;

connectMongoDb(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

// Middleware
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/url", urlRoute);
app.get("/:shortId", handelRedirectShortUrl);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
