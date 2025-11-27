const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const Song = require("../controllers/song");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

const upload = multer({
    dest: "static/uploads/",
}).single("file");

router.get("/", Song.findAll);
router.get("/:id", Song.findOne);
router.post(
    "/",
    authenticate,
    [check("title").not().isEmpty().withMessage("Song title is required")],
    validate,
    Song.create
);
router.patch("/:id", authenticate, Song.update);
router.delete("/:id", authenticate, Song.destroy);
router.put("/import", authenticate, upload, Song.import);
router.put("/export", authenticate, Song.export);

module.exports = router;
