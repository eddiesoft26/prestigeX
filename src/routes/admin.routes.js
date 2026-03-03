import express from "express";
import { approveInvestment, deleteInvestment } from "../controllers/adminInvestment.controller.js";
import {
  addToBlacklist,
  approveWithdrawal,
  getBlacklist,
  topUpUser,
  unblockIP,
} from "../controllers/admin.controller.js";
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

adminRouter.patch("/approve-investment/:Id", approveInvestment);
adminRouter.delete("/delete-investment/:id", deleteInvestment);

adminRouter.patch("/approve-withdrawal/:Id", approveWithdrawal);
adminRouter.patch("/withdrawal/:withdrawalId/reject", rejectWithdrawal);

adminRouter.post("/create-wallet", upsertWallet);
adminRouter.get("/wallets", getWallets);

adminRouter.get("/investments/pending", listPendingInvestments);
adminRouter.get("/withdrawals/pending", listPendingWithdrawals);


adminRouter.get("/users", listUsers);
adminRouter.post("/topup", topUpUser);

adminRouter.get("/blacklist", getBlacklist);
adminRouter.post("/blacklist", addToBlacklist);
adminRouter.delete("/blacklist/:id", unblockIP);

export default adminRouter;
