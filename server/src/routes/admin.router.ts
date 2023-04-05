import { Router } from "express";
import { isAdmin } from "../middlewares/admin";
import {
  adminLogin,
  allPosts,
  allUsers,
  createPost,
  createUser,
  deletePost,
  deleteUser,
  onePost,
  oneUser,
  updatePost,
  updateUser,
} from "../controllers/admin.controller";

const router = Router();

router.post("/login", adminLogin);
router.post("/user/create", isAdmin, createUser);
router.get("/users", isAdmin, allUsers);
router.get("/user/:id", isAdmin, oneUser);
router.put("/user/update/:id", isAdmin, updateUser);
router.delete("/user/delete/:id", isAdmin, deleteUser);

router.post("/post/create", isAdmin, createPost);
router.get("/posts", isAdmin, allPosts);
router.get("/post/:id", isAdmin, onePost);
router.put("/post/update/:id", isAdmin, updatePost);
router.delete("/post/delete/:id", isAdmin, deletePost);

export default router;
