const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("./config");
const reqLogger = (req, res, next) => {
  logger.info("Method", req.method);
  logger.info("Body", req.body);
  logger.info("Path", req.path);
  logger.info("------");
  next();
};

const unknownHandler = (req, res) => {
  return res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "Wrong format on parameter" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

const tokenCheck = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    const extractedToken = authorization.replace("Bearer ", "");
    req.token = extractedToken;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  try {
    const authorization = req.get("Authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      const extractedToken = authorization.replace("Bearer ", "");
      let userTokenData = jwt.verify(extractedToken, JWT_KEY);
      const requestUserId = userTokenData.id;
      const user = await User.findById(requestUserId);
      req.user = user
    }
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = {
  reqLogger,
  errorHandler,
  unknownHandler,
  tokenCheck,
  userExtractor,
};
