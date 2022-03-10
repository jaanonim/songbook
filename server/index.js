const express = require("express");
const Database = require("./database");
const cors = require("cors");

require("dotenv").config({
  path: "./.env"
});

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/songs/", require("./routes/songs"));
app.use(express.static("../client/dist"));


app.listen(PORT, async () => {
  await Database.connect();
  console.log(`Server is running: http://localhost:${PORT}`);
});

app.get("/api/hello", (req, res) => {
  console.log("oki")
  res.json({
    "ok": true,
    "lol": "Loremi"
  })
})
