// Import packages
const express = require("express");
const morgan = require("morgan");
// App
const app = express();
// Morgan
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.routes"));

const port = 1337;
app.listen(port, () => console.log(`Server running on port ${port}`));
