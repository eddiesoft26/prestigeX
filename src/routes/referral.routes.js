import express from "express";
import { getMyReferrals } from "../controllers/referral.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const referralRoutes = express.Router();
referralRoutes.use(protect);

referralRoutes.get("/", getMyReferrals);

export default referralRoutes;
