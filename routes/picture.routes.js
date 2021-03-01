const express = require("express");
const router = express.Router();
const picture = require("../models/picture.model");

module.exports = router;

/* All posts */
router.get("/", async (req, res) => {
  // if there are not params in the call, initialize the values to the default values
  let rover = req.query.rover || "curiosity";
  let camera = req.query.camera || "NAVCAM";
  let pictures = req.query.numberOfPictures || 3;
  //get the picture from the getPictures model
  await picture
    .getPictures(rover, camera, pictures)
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

// More routes can be added like get by date or delete date.
