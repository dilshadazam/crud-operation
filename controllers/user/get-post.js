// models
import Post from "../models/post.js";

export const getPost = async (req, res, next) => {
  try {
    const result = await Post.findAll({
      where: {
        isActive: true,
      },
      attributes: ["id", "posttext", "description", "createdAt"],
      raw: true,
    });
    res.status(200).json({
      message: "Post fetched",
      result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.stausCode = 500;
    }
    next(err);
  }
};
