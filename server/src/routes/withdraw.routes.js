import express from "express";
import { requestWithdrawal } from "../controllers/withdraw.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/request", authenticate, requestWithdrawal);

export default router;
