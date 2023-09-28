import express from "express";
import {
  ChangePassword,
  logIntoAccount,
  verifyEmail,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", logIntoAccount);

router.post("/verifyemail", verifyEmail);

router.put("/changepassword", ChangePassword);

export default router;
