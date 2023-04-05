import { Router } from "express";
import {
  allUsers,
  createUser,
  deleteUser,
  loginUser,
  readUser,
  updateUser,
} from "../controllers/user.controller";
import { verifyHeader } from "../middlewares";

const router = Router();

router.get("/all", allUsers);
router.get("/:id", verifyHeader, readUser);
router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/update/:id", verifyHeader, updateUser);
router.delete("/del/:id", verifyHeader, deleteUser);

export default router;
