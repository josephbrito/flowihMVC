import { Router } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  readUser,
  updateUser,
} from "../controllers/user.controller";
import { verifyHeader } from "../middlewares";
import {
  allPostFromUser,
  allPosts,
  createPost,
  deletePost,
  readPost,
  updatePost,
} from "../controllers/post.controller";

const router = Router();

// Route for user
router.get("/:id", verifyHeader, readUser);
router.post("/register", createUser);
router.post("/login", loginUser);

router.put("/update/:id", verifyHeader, updateUser);
router.delete("/del/:id", verifyHeader, deleteUser);
// End Route for user

// Route for Post
router.get("/:id/post/:postid", verifyHeader, readPost);
router.post("/:id/post", verifyHeader, createPost);
router.put("/:id/post/update/:postid", verifyHeader, updatePost);
router.delete("/:id/post/del/:postid", verifyHeader, deletePost);

router.get("/allposts", allPosts);
router.get("/:id/posts", verifyHeader, allPostFromUser);
// End Route for Post

export default router;
