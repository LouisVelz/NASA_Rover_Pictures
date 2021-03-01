const express = require("express");
const router = express.Router();
//if the route matches, call the route for that call
router.use("/api/v1/pictures", require("./picture.routes"));

//more routes can be added as needed
//example routes.use("api/v1/users", require("./users.routes"))
module.exports = router;
