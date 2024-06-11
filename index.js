const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./connection");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const { mongoURI } = require("./config");
const { handelRedirectShortUrl } = require("./controllers/url");
const URL = require("./models/url");

const app = express();
const port = 8000;

connectMongoDb(mongoURI)
  .then(() => console.log("MongoDB server is running on " + mongoURI))
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
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamps: Date.now() },
        },
      },
      { new: true } // This option ensures the updated document is returned
    );

    if (!entry) {
      return res.status(404).json({ message: "URL not found1." });
    }

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
