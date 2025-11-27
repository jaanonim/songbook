const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("express-simple-logger");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(logger());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(
    express.urlencoded({
        extended: false,
    })
);

require("./routes/index")(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

module.exports = { app };
