const express = require("express");
const app = express();
const cors = require("cors");
const blogRoutes = require("./controller/blogRoutes");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const userRoutes = require("./controller/userRoutes");
const loginRoutes = require("./controller/login");

mongoose
  .connect(config.MONGODBURI)
  .then(() => {
    logger.info("Connected to MONGODB");
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB", err);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.reqLogger);
app.use(middleware.tokenCheck);
app.use("/api/blogs", middleware.userExtractor, blogRoutes);
app.use("/api/user", userRoutes);
app.use("/api/login", loginRoutes);

if (process.env.NODE_ENV === "test") {
  const testRoutes = require("./controller/testRoutes");
  app.use("/api/test", testRoutes);
}

app.use(middleware.errorHandler);
app.use(middleware.unknownHandler);
module.exports = app;
