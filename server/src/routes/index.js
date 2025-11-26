const auth = require("./auth");
const user = require("./user");
const song = require("./song");
const unsplash = require("./unsplash");

const authenticate = require("../middlewares/authenticate");

module.exports = (app) => {
  app.get("/api", (req, res) => {
    res.status(200).send({
      message: "Welcome to the SongBook REST API.",
    });
  });

  app.use("/api/auth", auth);
  app.use("/api/unsplash", authenticate, unsplash);
  app.use("/api/user", authenticate, user);
  app.use("/api/song", authenticate, song);
};
