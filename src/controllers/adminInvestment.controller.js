import prisma from "../prisma.js";

export const approveInvestment = async (req, res) => {
  const { investmentId } = req.params;

  try {
    // 1. Start the Secure Transaction Bubble
    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch investment AND the investor's referral info
      const investment = await tx.investment.findUnique({
        where: { id: investmentId },
        include: {
          user: {
            select: { referredById: true }, // 👈 We need to see who referred this person
          },
        },
      });

      if (!investment) throw new Error("Investment not found");
      if (investment.status !== "PENDING") throw new Error("Processed already");

      // 2. Standard Logic for Dates/Profit
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 30);
      const profit = (investment.amount * investment.roiPercent) / 100;

      // 3. Update Investment Status
      const updatedInvestment = await tx.investment.update({
        where: { id: investmentId },
        data: { status: "APPROVED", startDate, endDate, profit },
      });

      // 4. Record Investment Transaction for the Investor
      await tx.transaction.create({
        data: {
          userId: investment.userId,
          amount: investment.amount,
          type: "INVESTMENT", // Changed from DEPOSIT to match your enum for clarity
          status: "APPROVED",
        },
      });

      // 5. 🚀 NEW: THE REFERRAL COMMISSION LOGIC
      if (investment.user.referredById) {
        const commission = investment.amount * 0.1; // 10% commission

        // Update Referrer's Bonus Balance
        await tx.user.update({
          where: { id: investment.user.referredById },
          data: { referralBonus: { increment: commission } },
        });

        // Create a Transaction record for the Referrer
        await tx.transaction.create({
          data: {
            userId: investment.user.referredById,
            amount: commission,
            type: "REFERRAL_BONUS",
            status: "APPROVED",
          },
        });
      }

      return updatedInvestment;
    });

    return res.status(200).json(result);
  } catch (error) {
    // 7. If anything failed inside the $transaction, nothing was saved to the DB
    console.error("Approval Error:", error.message);
    res.status(400).json({
      message: error.message || "Approval failed. Database rolled back.",
    });
  }
};
