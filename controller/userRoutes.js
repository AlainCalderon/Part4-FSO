const express = require("express");
const userRoutes = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRoutes.get("/", async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

userRoutes.post("/", async (req, res, next) => {
  const { username, password, name } = req.body;
  const saltRounds = 10;
  const passHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    password: passHash,
    name,
  });
  if (password.length < 3) {
    return res
      .status(400)
      .send({ error: "Password length must be longer that 2" });
  } else {
    try {
      await user.save();
      res.json({ result: "User has been successfully created" });
    } catch (err) {
      next(err);
    }
  }
});



module.exports = userRoutes;
