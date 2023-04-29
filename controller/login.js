const logInRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

logInRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const passwordCheck =
      user === null ? false : await bcrypt.compare(password, user.password);
    if (!(user && passwordCheck)) {
      res.status(401).json({ error: "Invalid username or password" });
    } else {
      const userToken = { username: user.username, id: user._id };
      const token = jwt.sign(userToken, process.env.JWT_KEY);
      res.status(200).send({ token, username: user.username, name: user.name });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = logInRouter;
