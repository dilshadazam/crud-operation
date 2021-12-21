import express from "express";

//middleware
// import { isUser } from "../middleware/is-user.js";
//CREATE POST
import { createPost } from "../controllers/user/create-post.js";
//GET POST
import { getPost } from "../controllers/user/get-post.js";
import { editPost } from "../controllers/user/update-post.js";
import { deletePost } from "../controllers/user/delete-post.js";
import router from "./authentication-routes.js";
//ADD NEW POST
router.post(
  "/add-post",
  // isUser,
  createPost
);
//FTECH POST
router.get(
  "/fetch-post/",
  // isUser,
  getPost
);
//UPDATE POST
router.put(
  "/update-post/:postId",
  // isUser,
  editPost
);
//DELETE POST
router.delete(
  "/delete-post/:postId",
  // isUser,
  deletePost
);
export default router;
