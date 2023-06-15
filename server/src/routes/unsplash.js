const express = require("express");
const unsplash = require("../controllers/unsplash");

const router = express.Router();
router.get("/", unsplash.getPhotos);

module.exports = router;
