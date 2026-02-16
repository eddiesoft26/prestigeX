import express from "express";
import { approveInvestment } from "../controllers/adminInvestment.controller.js";
import { approveWithdrawal } from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import {
  upsertWallet,
  getWallets,
  listPendingInvestments,
  listPendingWithdrawals,
  listUsers,
  rejectWithdrawal,
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();
adminRouter.use(protect, isAdmin);



adminRouter.patch("/approve-investment/:investmentId", approveInvestment);

adminRouter.put("/withdrawal/:withdrawalId/approve", approveWithdrawal);

adminRouter.post("/wallet", upsertWallet);
adminRouter.get("/wallets", getWallets);

adminRouter.get("/investments/pending", listPendingInvestments);
adminRouter.get("/withdrawals/pending", listPendingWithdrawals);
adminRouter.patch("/withdrawal/:withdrawalId/reject", rejectWithdrawal);


adminRouter.get("/users", listUsers);

export default adminRouter;
