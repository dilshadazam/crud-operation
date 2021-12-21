import Post from "../models/post.js";

export const createPost = async (req, res, next) => {
  // validationErrorHandler(req, next);
  const { posttext, description } = req.body;
  try {
    const response = await Post.create({
      posttext,
      description,
    });
    res.status(201).json({
      message: "New post is created",
      response,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
