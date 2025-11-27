const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        try {
            if (err) return res.sendStatus(403);

            const email = decoded.email;
            const user = await User.findOne({ email });
            if (!user)
                return res
                    .status(401)
                    .json({ message: "Unauthorized Access!" });
            req.user = user;
        } catch (e) {
            console.log(e);
        }

        next();
    });
};
