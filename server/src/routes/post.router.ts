import { Router } from "express";
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

router.get("/all", allPosts);
router.get("/:id/post/:postid", verifyHeader, readPost);
router.post("/:id/post", verifyHeader, createPost);
router.put("/:id/post/update/:postid", verifyHeader, updatePost);
router.delete("/:id/post/del/:postid", verifyHeader, deletePost);

router.get("/:id/posts", verifyHeader, allPostFromUser);

export default router;
