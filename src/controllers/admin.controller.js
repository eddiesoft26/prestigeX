import prisma from "../prisma.js";

export const approveWithdrawal = async (req, res) => {
  const { Id } = req.params;

  try {
    // 1. Start the Transaction "Bubble"
    const result = await prisma.$transaction(async (tx) => {
      // 2. Find the withdrawal first to get the userId and amount
      const withdrawal = await tx.withdrawal.findUnique({
        where: { id: Id },
      });

      if (!withdrawal) {
        throw new Error("Withdrawal not found");
      }

      if (withdrawal.status !== "PENDING") {
        throw new Error("Withdrawal already processed");
      }

      // 3. Update the Withdrawal status to APPROVED
      const updatedWithdrawal = await tx.withdrawal.update({
        where: { id: Id },
        data: { status: "APPROVED" },
      });

      // 4. Create the Transaction Record (The Audit Trail)
      // This links to the User's transaction list automatically via userId
      await tx.transaction.create({
        data: {
          userId: withdrawal.userId, // Points to the owner
          amount: withdrawal.amount,
          type: "WITHDRAWAL", // Identifies the move type
          status: "APPROVED",
        },
      });

      // 5. (Optional) If you have a 'balance' field on User, deduct it here:
      /* 
      await tx.user.update({
        where: { id: withdrawal.userId },
        data: { balance: { decrement: withdrawal.amount } }
      });
      */

      return updatedWithdrawal;
    });

    // 6. Success Response
    res.json({
      message: "Withdrawal approved and history recorded",
      withdrawal: result,
    });
  } catch (error) {
    // 7. Handle errors and rollback
    console.error("Withdrawal Error:", error.message);
    res.status(400).json({
      message: error.message || "Withdrawal approval failed",
    });
  }
};

// Add / update wallet address
export const upsertWallet = async (req, res) => {
  const { coin, address } = req.body;
  

  if (!coin || !address) {
    return res
      .status(400)
      .json({ message: "Coin name and address are required" });
  }

  try {
    const wallet = await prisma.AdminWallet.upsert({
      where: { coin },
      update: { address },
      create: { coin, address },
    });

    res.json({ message: "Wallet updated", wallet });
  } catch (error) {
    res.status(500).json({ message: "Failed to update wallet" });
  }
};

// Get wallet addresses
export const getWallets = async (req, res) => {
  try {
    const wallets = await prisma.AdminWallet.findMany();
    res.json(wallets);
  } catch (error){
    console.error("PRISMA FETCH ERROR:", error);
    res.status(500).json({
      message: "Database Sync Error",
      details: error.message,
    });
  }
};

export const listPendingInvestments = async (req, res) => {
  try {
    const investments = await prisma.investment.findMany({
      where: { status: "PENDING" },
      take: 50,
      include: { user: true }, // show user info
    });
    res.json(investments);
  } catch {
    res.status(500).json({ message: "Failed to fetch investments" });
  }
};

export const listPendingWithdrawals = async (req, res) => {
  try {
    const withdrawals = await prisma.withdrawal.findMany({
      where: { status: "PENDING" },
      take: 50,
      include: { user: true },
    });
    res.json(withdrawals);
  } catch {
    res.status(500).json({ message: "Failed to fetch withdrawals" });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        email: true,
        ip: true,
        country: true,
        welcomeBonus: true,
        referralBonus: true,
        createdAt: true,
        investments: {
          where: { status: "APPROVED" },
          select: {
            amount: true,
            investmentType: true,
            profit: true,
          },
        },
        withdrawals: {
          where: { status: "APPROVED" },
          select: {
            amount: true,
          },
        },
      },
    });

    const usersWithAssets = users.map((user) => {
      // 1. Safely sum investments (Ensure we handle null/undefined)
      const totalInvested =
        user.investments?.reduce(
          (acc, inv) => acc + Number(inv.amount || 0),
          0,
        ) || 0;
      const totalProfit =
        user.investments?.reduce(
          (acc, inv) => acc + Number(inv.profit || 0),
          0,
        ) || 0;

      // 2. Safely sum withdrawals
      const totalWithdrawn =
        user.withdrawals?.reduce((acc, w) => acc + Number(w.amount || 0), 0) ||
        0;

      // 3. Cast bonuses to numbers
      const welcome = Number(user.welcomeBonus || 0);
      const referral = Number(user.referralBonus || 0);

      // 4. Final Calculation
      const totalAssets =
        totalInvested + totalProfit + welcome + referral - totalWithdrawn;

      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        ip: user.ip || "N/A",
        country: user.country || "Unknown",
        createdAt: user.createdAt,
        // Using parseFloat to ensure we return a clean number
        totalAssets: Number(totalAssets.toFixed(2)),
      };
    });

    res.json(usersWithAssets);
  } catch (error) {
    console.error("LIST_USERS_ERROR:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
export const rejectWithdrawal = async (req, res) => {
  const { withdrawalId } = req.params;
  const { reason } = req.body; // Admin sends the reason from the frontend

  if (!reason) {
    return res
      .status(400)
      .json({ message: "Please provide a reason for rejection" });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Verify existence
      const withdrawal = await tx.withdrawal.findUnique({
        where: { id: withdrawalId },
      });

      if (!withdrawal) throw new Error("Withdrawal not found");
      if (withdrawal.status !== "PENDING") throw new Error("Already processed");

      // 2. Update Withdrawal with REJECTED status and the reason
      const rejectedWithdrawal = await tx.withdrawal.update({
        where: { id: withdrawalId },
        data: {
          status: "REJECTED",
          rejectionReason: reason,
        },
      });

      // 3. Create a Transaction history record for the user's audit trail
      await tx.transaction.create({
        data: {
          userId: withdrawal.userId,
          amount: withdrawal.amount,
          type: "WITHDRAWAL",
          status: "REJECTED",
        },
      });

      return rejectedWithdrawal;
    });

    res.json({ message: "Withdrawal rejected", data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const topUpUser = async (req, res) => {
  const { userId, amount, planName, investmentType } = req.body;

  try {
    const topUp = await prisma.investment.create({
      data: {
        userId,
        amount: parseFloat(amount),
        plan: planName || "STARTER",
        status: "APPROVED", // Auto-approved so it reflects in assets immediately
        profit: 0,
        roiPercent: 0,
        totalPayout: parseFloat(amount),
        investmentType: investmentType, //remember to implement from ui before sending
        proofUrl: "SYSTEM_GENERATED",
      },
    });

    res.status(201).json({
      success: true,
      message: "Funds added successfully",
      data: topUp,
    });
  } catch (error) {
    console.error("TOPUP ERROR:", error);
    res.status(500).json({ message: "Failed to process top-up" });
  }
};

// 1. Get all blocked IPs
export const getBlacklist = async (req, res) => {
  try {
    const list = await prisma.blacklist.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blacklist" });
  }
};

export const addToBlacklist = async (req, res) => {
  const { ip, reason } = req.body;
  if (!ip) return res.status(400).json({ message: "IP is required" });

  try {
    const existing = await prisma.blacklist.findUnique({ where: { ip } });
    if (existing)
      return res.status(400).json({ message: "This IP is already blocked" });

    await prisma.blacklist.create({
      data: { ip, reason: reason || "Manual block" },
    });
    res.status(201).json({ message: "IP blocked" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Database error" });
  }
};

// 2. Remove an IP from blacklist
export const unblockIP = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.blacklist.delete({
      where: { id },
    });
    res.json({ message: "IP address unblocked" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unblock IP" });
  }
};
