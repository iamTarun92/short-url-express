const URL = require("../models/url");

async function handelGenerateShortUrl(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }
  // Dynamically import nanoid
  const { nanoid } = await import("nanoid");
  const shortId = nanoid();
  const shortUrl = `${req.protocol}://${req.get("host")}/url/${shortId}`;

  const entry = new URL({
    shortId,
    shortUrl,
    redirectUrl: url,
    visitHistory: [],
  });

  await entry
    .save()
    .then((url) => res.status(201).json({ shortUrl }))
    .catch((err) => res.status(400).json({ error: "Unable to add this url." }));
}

async function handelRedirectShortUrl(req, res) {
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
      return res.status(404).json({ message: "URL not found." });
    }

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function handelGetAnalytics(req, res) {
  try {
    const { shortId } = req.params;
    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ message: "URL not found." });
    }

    return res.status(201).json({
      message: "Successed.",
      analytics: result.visitHistory,
      totalclicks: result.visitHistory.length,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

module.exports = {
  handelGenerateShortUrl,
  handelRedirectShortUrl,
  handelGetAnalytics,
};
