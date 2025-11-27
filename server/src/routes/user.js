const express = require("express");
const { check } = require("express-validator");

const User = require("../controllers/user");
const validate = require("../middlewares/validate");

const router = express.Router();

router.get("/", User.findMany);
router.post(
    "/",
    [
        check("email").isEmail().withMessage("Enter a valid email address"),
        check("username")
            .not()
            .isEmpty()
            .withMessage("You username is required"),
    ],
    validate,
    User.create
);
router.get("/current", User.current);
router.get("/:id", User.findOne);
router.put("/:id", User.update);
router.delete("/:id", User.destroy);

module.exports = router;
