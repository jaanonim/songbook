const express = require("express");
const routes = express.Router();
const Song = require("../models/song");

routes.get("/", async (req, res) => {
    const songs = await Song.getAll();
    res.json(songs);
})

module.exports = routes;
