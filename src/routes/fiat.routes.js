import express from "express";
import {
  createInvestment,
  getTransactions,
  requestWithdrawal,
  uploadProof,
  getPendingInvestments,
} from "../controllers/fiat.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();
router.use(protect);

router.post("/invest", createInvestment);
router.post("/withdraw", requestWithdrawal);
router.get("/transactions", getTransactions);
router.get("/pending-investments", getPendingInvestments);

// POST /api/fiat/upload-proof
router.post("/upload-proof", protect,(req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error("MULTER/CLOUDINARY ERROR:", err);
      return res.status(500).json({ message: "Multer Error", error: err.message });
    }
    next();
  });
}, uploadProof);

export default router;
