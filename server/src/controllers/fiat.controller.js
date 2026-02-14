import prisma from "../prisma.js";

export const createInvestment = async (req, res) => {
  const { amount, plan, roiPercent, profit, totalPayout } = req.body;

  try {
    const investment = await prisma.investment.create({
      data: {
        userId: req.user.id,
        plan,
        amount,
        roiPercent: parseFloat(roiPercent),
        profit,
        totalPayout, // ✅ Save the pre-calculated value
      },
    });

    res.status(201).json(investment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create investment" });
  }
};

export const requestWithdrawal = async (req, res) => {
  const userId = req.user.id;
  const { amount, walletAddress, coin } = req.body;

  try {
    // get approved investments
    const investments = await prisma.investment.findMany({
      where: {
        userId,
        status: "APPROVED",
      },
    });

    if (!investments.length) {
      return res.status(400).json({
        message: "You must invest real money before withdrawing",
      });
    }

    // total matured earnings
    const totalInvestmentBalance = investments.reduce((sum, inv) => {
      return sum + inv.amount + (inv.profit || 0);
    }, 0);

    // get previous withdrawals
    const withdrawals = await prisma.withdrawal.findMany({
      where: {
        userId,
        status: {
          in: ["PENDING", "APPROVED"],
        },
      },
    });

    const totalWithdrawn = withdrawals.reduce((sum, w) => sum + w.amount, 0);

    const withdrawableBalance = totalInvestmentBalance - totalWithdrawn;

    if (amount > withdrawableBalance) {
      return res.status(400).json({
        message: "Insufficient withdrawable balance",
      });
    }

    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId,
        amount,
        walletAddress,
        coin,
        status: "PENDING",
      },
    });

    res.json({
      message: "Withdrawal request submitted",
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({ message: "Withdrawal failed" });
  }
};
