const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../config/api");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: "Your email is required",
            trim: true,
        },

        username: {
            type: String,
            unique: true,
            required: false,
            index: true,
            sparse: true,
        },
        password: {
            type: String,
            required: "Your password is required",
            max: 100,
        },
        refreshToken: [String],
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.serialize = function () {
    return {
        id: this._id,
        email: this.email,
        username: this.username,
    };
};

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateAccess = function () {
    let payload = {
        id: this._id,
        email: this.email,
        username: this.username,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1m",
    });
};

UserSchema.methods.generateRefresh = function () {
    let payload = {
        email: this.email,
    };

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

UserSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordExpires =
        Date.now() + 3600000 * config.auth.expirationDate; //expires in an hour
};

module.exports = mongoose.model("Users", UserSchema);
