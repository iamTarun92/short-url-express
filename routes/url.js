const express = require("express");
const {
  handelGenerateShortUrl,
  handelGetAnalytics,
} = require("../controllers/url");
const router = express.Router();

router
  .get("/analytics/:shortId", handelGetAnalytics)
  .post("/", handelGenerateShortUrl);

module.exports = router;
