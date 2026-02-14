import prisma from "../prisma.js";

export const approveWithdrawal = async (req, res) => {
  const { withdrawalId } = req.params;

  try {
    // 1. Start the Transaction "Bubble"
    const result = await prisma.$transaction(async (tx) => {
      // 2. Find the withdrawal first to get the userId and amount
      const withdrawal = await tx.withdrawal.findUnique({
        where: { id: withdrawalId },
      });

      if (!withdrawal) {
        throw new Error("Withdrawal not found");
      }

      if (withdrawal.status !== "PENDING") {
        throw new Error("Withdrawal already processed");
      }

      // 3. Update the Withdrawal status to APPROVED
      const updatedWithdrawal = await tx.withdrawal.update({
        where: { id: withdrawalId },
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
    const wallets = await prisma.wallet.findMany();
    res.json(wallets);
  } catch {
    res.status(500).json({ message: "Failed to fetch wallets" });
  }
};

export const listPendingInvestments = async (req, res) => {
  try {
    const investments = await prisma.investment.findMany({
      where: { status: "PENDING" },
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
      select: {
        id: true,
        fullName: true,
        email: true,
        investedAmount: true,
        welcomeBonus: true,
        referralBonus: true,
        _count: {
          select: { referrals: true },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(users);
  } catch {
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
