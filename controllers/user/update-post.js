//models
import Post from "../models/post.js";

export const editPost = async (req, res, next) => {
  const { posttext, description } = req.body;
  try {
    const result = await Post.update(
      {
        posttext,
        description,
      },
      {
        where: {
          id: req.params.postId,
        },
      }
    );
    if (result[0] === 0) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({
      message: "Post updated successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
