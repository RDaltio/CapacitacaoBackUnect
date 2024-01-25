import express from "express";
import usersController from "../controllers/usersController.js";
import authenticateUser from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .post("/users", usersController.registerUser)
  .post("/users/login", usersController.loginUser)
  .delete("/users/delete", authenticateUser, usersController.deleteUser);

export default router;