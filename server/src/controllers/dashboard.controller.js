import prisma from "../prisma.js";

export const getDashboardSummary = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Get User Bonuses & Referral Count (Standard query)
  const user = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    welcomeBonus: true,
    referralBonus: true,
    _count: {
      select: {
        referrals: true,
      },
    },
  },
});

console.log("DB RAW COUNT:", user._count.referrals); 

    // 2. 🔥 AGGREGATE INVESTMENTS (Sum Principal and Profit)
    const investmentTotals = await prisma.investment.aggregate({
      where: { userId, status: "APPROVED" },
      _sum: {
        amount: true,
        profit: true,
      },
    });

    // 3. 🔥 AGGREGATE WITHDRAWALS (Sum Pending and Approved)
    const withdrawalTotals = await prisma.withdrawal.aggregate({
      where: {
        userId,
        status: { in: ["PENDING", "APPROVED"] },
      },
      _sum: {
        amount: true,
      },
    });

    // 4. Extract the raw numbers (handle nulls with || 0)
    const totalInvested = investmentTotals._sum.amount || 0;
    const totalProfit = investmentTotals._sum.profit || 0;
    const totalWithdrawn = withdrawalTotals._sum.amount || 0;

    // 5. CALCULATE FINAL BALANCES
    // Total Assets: (Principal + Profit + Bonuses) - Total Withdrawn
    const totalAssets = (totalInvested + totalProfit + user.welcomeBonus + user.referralBonus) - totalWithdrawn;

    // Withdrawable: (Principal + Profit) - Total Withdrawn
    const withdrawableBalance = (totalInvested + totalProfit) - totalWithdrawn;

    // 6. Format Response
    const data = {
      totalAssets,
      totalInvested,
      totalProfit,
      welcomeBonus: user.welcomeBonus,
      referralBonus: user.referralBonus,
      withdrawableBalance,
      referralsCount: user._count.referrals,
    };

    res.json(data);

  } catch (error) {
    console.error('SUMMARY AGGREGATE ERROR:', error.message);
    res.status(500).json({ message: "Failed to calculate financial summary" });
  }
};
