const express = require("express");
const {
  handelGenerateShortUrl,
  handelGetAnalytics,
  handelRedirectShortUrl,
} = require("../controllers/url");
const URL = require("../models/url");
const router = express.Router();

router
  .get("/", async (req, res) => {
    if (!req.user) return res.redirect("/login");
    const allURL = await URL.find({ createdBy: req.user._id });
    res.render("urls", { allURL });
  })
  .get("/analytics/:shortId", handelGetAnalytics)
  .post("/shorten", handelGenerateShortUrl);

module.exports = router;
