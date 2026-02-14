import express from "express";
import { getAdminWallets } from "../controllers/adminWallet.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const walletRoute = express.Router();

// GET /api/admin-wallets
walletRoute.get("/", protect, getAdminWallets);

export default walletRoute;
