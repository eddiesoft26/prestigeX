import prisma from "../prisma.js";

export const approveInvestment = async (req, res) => {
  const { Id } = req.params;

  try {
    // 1. Start the Secure Transaction Bubble
    const result = await prisma.$transaction(
      async (tx) => {
        // 1. Fetch investment AND the investor's referral info
        const investment = await tx.investment.findUnique({
          where: { id: Id },
          include: {
            user: {
              select: { referredById: true }, // 👈 We need to see who referred this person
            },
          },
        });

        if (!investment) throw new Error("Investment not found");
        if (investment.status !== "PENDING")
          throw new Error("Processed already");

        // 2. Standard Logic for Dates/Profit
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 30);
        const profit = (investment.amount * investment.roiPercent) / 100;

        // 3. Update Investment Status
        const updatedInvestment = await tx.investment.update({
          where: { id: Id },
          data: { status: "APPROVED", startDate, endDate, profit },
        });

        // 4. Record Investment Transaction for the Investor
        await tx.transaction.create({
          data: {
            userId: investment.userId,
            amount: investment.amount,
            type: "INVESTMENT",
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
      },
      {
        timeout: 15000, // Increase to 15 seconds to account for latency in Aba
        maxWait: 5000,
      },
    );

    return res.status(200).json(result);
  } catch (error) {
    // 7. If anything failed inside the $transaction, nothing was saved to the DB
    console.error("Approval Error:", error.message);
    res.status(400).json({
      message: error.message || "Approval failed. Database rolled back.",
    });
  }
};

export const deleteInvestment = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Check if it exists and its current status
    const investment = await prisma.investment.findUnique({
      where: { id: id }
    });

    if (!investment) {
      return res.status(404).json({ message: "Investment record not found" });
    }

    // 2. Security Check: Prevent deleting active/approved money
    if (investment.status === "APPROVED") {
      return res.status(400).json({ 
        message: "Cannot delete an approved investment. Please reject or archive it instead." 
      });
    }

    // 3. Perform the deletion
    await prisma.investment.delete({
      where: { id: id }
    });

    return res.status(200).json({ message: "Investment deleted successfully" });
  } catch (error) {
    console.error("DELETE_INVESTMENT_ERROR:", error.message);
    return res.status(500).json({ message: "Internal server error during deletion" });
  }
};