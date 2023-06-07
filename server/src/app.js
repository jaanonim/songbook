const express = require("express");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const logger = require("express-simple-logger");

const app = express();

app.use(cors());
app.use(logger());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(passport.initialize());
require("./middlewares/jwt")(passport);

require("./routes/index")(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

module.exports = { app };
