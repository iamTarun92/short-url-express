const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  const allURL = await URL.find();
  res.render("index", {
    allURL,
  });
});

module.exports = router;
