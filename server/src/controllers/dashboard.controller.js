import prisma from "../prisma.js";

export const getDashboardSummary = async (req, res) => {
  const userId = req.user.id;

  try {

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        welcomeBonus: true,
        referralBonus: true,
          _count: {
          select: { referrals: true },
        },
      },
    });

    // Approved investments
    const investments = await prisma.investment.findMany({
      where: {
        userId,
        status: "APPROVED",
      },
    });

    const totalInvested = investments.reduce(
      (sum, inv) => sum + inv.amount,
      0
    );

    const totalProfit = investments.reduce(
      (sum, inv) => sum + (inv.profit || 0),
      0
    );

    // withdrawals
    const withdrawals = await prisma.withdrawal.findMany({
      where: {
        userId,
        status: {
          in: ["PENDING", "APPROVED"],
        },
      },
    });

    const totalWithdrawn = withdrawals.reduce(
      (sum, w) => sum + w.amount,
      0
    );

    // withdrawable balance (ONLY real investment earnings)
    const withdrawableBalance =
      totalInvested + totalProfit - totalWithdrawn;

    // total assets (bonuses included)
    const totalAssets =
      totalInvested +
      totalProfit +
      user.welcomeBonus +
      user.referralBonus;

      const data ={
      totalAssets,
      totalInvested,
      totalProfit,
      welcomeBonus: user.welcomeBonus,
      referralBonus: user.referralBonus,
      withdrawableBalance,
      referralsCount: user._count.referrals,
      _count: undefined,
    }

    res.json(data);

  } catch (error) {
    console.error('THE ERROR', error.message)
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};
