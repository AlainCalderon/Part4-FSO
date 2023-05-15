const noteRoute = require("express").Router();
const Blog = require("../models/blog");
noteRoute.get("/", async (req, res, next) => {
  try {
    const blog = await Blog.find({}).populate("user", "name");
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

noteRoute.post("/", async (req, res, next) => {
  const user = req.user;
  let { title, author, url, likes } = req.body;
  if (!title) {
    return res.status(400).send({ error: "Can't save blog with no title" });
  }
  if (!likes) {
    likes = 0;
  }
  if (!user.id) {
    return res.status(401).json({ error: "Token invalid" });
  }
  try {
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user.id,
    });

    const saveBlog = await blog.save();
    res.status(200).json({ result: "Blog saved to account" });
  } catch (err) {
    next(err);
  }
});

noteRoute.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let userData = req.user;
  // const userToken = req.token;
  // let tokenVerifyResult = jwt.verify(userToken, JWT_KEY);
  if (!userData) {
    res.status(401).json({ error: "Token is Invalid" });
  }

  try {
    console.log(userData.id);
    let blogData = await Blog.findById(id);
    console.log(blogData);
    if (blogData.user.toString() === userData.id) {
      const deleteResult = await Blog.findByIdAndDelete(id);
      res.json(deleteResult);
    } else {
      res.status(401).json({ error: "Invalid user ID " });
    }
  } catch (exception) {
    next(exception);
  }
});

noteRoute.put("/:id", async (req, res, next) => {
  let id = req.params.id;
  let updateData = req.body;

  try {
    const updateResult = await Blog.findByIdAndUpdate(id, updateData);
    res.json(updateResult);
  } catch (exception) {
    next(exception);
  }
});

module.exports = noteRoute;
