const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const bcrypt = require("bcryptjs");
const port = 8000;

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

app.use( session({
    secret: "does not matter",
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/client/dist")));



app.listen(port, () => {
  console.log(`Listening on port ${port}.....`);
});
