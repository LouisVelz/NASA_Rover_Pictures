const express = require("express");
const router = express.Router();
const picture = require("../models/picture.model");

module.exports = router;

/* All posts */
router.get("/", async (req, res) => {
  await picture
    .getPictures()
    .then((pictures) => {
      return res.json(pictures);
    })
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});
