import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { checkIPBlacklist } from "../middleware/ipBlocker.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const authRoutes = express.Router();

authRoutes.post("/register",checkIPBlacklist,authLimiter, register);
authRoutes.post("/login",checkIPBlacklist, authLimiter, login);


export default authRoutes;
