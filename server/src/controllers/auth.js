const User = require("../models/user");

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = async (req, res) => {
    try {
        const { email } = req.body;

        // Make sure this account doesn't already exist
        const user = await User.findOne({
            email,
        });

        if (user)
            return res.status(401).json({
                message:
                    "The email address you have entered is already associated with another account.",
            });

        const newUser = new User({
            ...req.body,
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Registration successful.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = async (req, res) => {
    try {
        const cookies = req.cookies;
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
            return res.status(401).json({
                msg:
                    "The email address " +
                    email +
                    " is not associated with any account. Double-check your email address and try again.",
            });

        if (!user.comparePassword(password))
            return res.status(401).json({
                message: "Invalid email or password",
            });

        const accessToken = user.generateAccess();
        const refreshToken = user.generateRefresh();

        let newRefreshTokenArray = !cookies?.jwt
            ? user.refreshToken
            : user.refreshToken.filter((rt) => rt !== cookies.jwt);

        if (cookies?.jwt) {
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            if (!foundToken) {
                console.log("attempted refresh token reuse at login!");
                newRefreshTokenArray = [];
            }
            res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
        }

        user.refreshToken = [...newRefreshTokenArray, refreshToken];
        const result = await user.save();
        console.log(result);

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            user: user.serialize(),
            accessToken,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// @route POST api/auth/refresh
// @desc Refresh access token
// @access Public
exports.refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    const user = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    if (!user) {
        try {
            const decodedEmail = await validateRefreshToken(refreshToken);
            console.log("attempted refresh token reuse!");
            const hackedUser = await User.findOne({
                email: decodedEmail,
            }).exec();
            hackedUser.refreshToken = [];
            await hackedUser.save();
        } catch (err) {}
        return res.sendStatus(403);
    }

    const newRefreshTokenArray = user.refreshToken.filter(
        (rt) => rt !== refreshToken
    );

    try {
        const decodedEmail = await validateRefreshToken(refreshToken);

        if (user.email !== decodedEmail) throw new Error("Email don't match");

        const accessToken = user.generateAccess();
        const refreshToken = user.generateRefresh();
        user.refreshToken = [...newRefreshTokenArray, refreshToken];
        await user.save();

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ user: user.serialize(), accessToken });
    } catch (err) {
        user.refreshToken = [...newRefreshTokenArray];
        const result = await user.save();
        return res.sendStatus(403);
    }
};

// @route POST api/auth/logout
// @desc Logout user
// @access Public
exports.logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        return res.sendStatus(204);
    }

    user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
    await user.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
};

const validateRefreshToken = async function (refreshToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return reject(err);
                return resolve(decoded.email);
            }
        );
    });
};
