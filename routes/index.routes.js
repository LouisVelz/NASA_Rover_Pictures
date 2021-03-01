const express = require("express");
const router = express.Router();

router.use("/api/v1/pictures", require("./picture.routes"));

module.exports = router;
