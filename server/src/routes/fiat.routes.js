import express from "express";
import { createInvestment, requestWithdrawal } from "../controllers/fiat.controller.js";
import  { protect }  from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protect)

router.post("/invest", createInvestment);
router.post("/withdraw", requestWithdrawal);

export default router;
