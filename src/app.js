import express from "express";
import cors from "cors";
import morgan from "morgan";
import dashboardRoutes from "./routes/dashboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import fiatRoutes from "./routes/fiat.routes.js"
import walletRoute from "./routes/adminWallets.routes.js";
import referralRoutes from "./routes/referral.routes.js";
import Koyeb from "./routes/koyeb.routes.js";
  

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://prestige-x.vercel.app' // Add this!
];
app.use(cors({
  origin: allowedOrigins, 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev")); // Logs every request like "GET /api/dashboard 200"

app.use('',Koyeb)
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/fiat", fiatRoutes);
app.use("/api/admin-wallets", walletRoute);
app.use("/api/referrals",  referralRoutes)



export default app;
