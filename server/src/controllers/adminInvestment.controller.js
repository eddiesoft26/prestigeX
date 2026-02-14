import prisma from "../prisma.js";

export const approveInvestment = async (req, res) => {
  const { investmentId } = req.params;

  try {
    // 1. Start the Secure Transaction Bubble
    const result = await prisma.$transaction(async (tx) => {
      
      // 2. Fetch the investment within the transaction (using 'tx')
      const investment = await tx.investment.findUnique({
        where: { id: investmentId },
      });

      if (!investment) {
        throw new Error("Investment not found");
      }

      if (investment.status !== "PENDING") {
        throw new Error("Investment has already been processed");
      }

      // 3. Logic for Dates and Profit
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 30); // 30-day plan logic
      const profit = (investment.amount * investment.roiPercent) / 100;

      // 4. Update the Investment Status
      const updatedInvestment = await tx.investment.update({
        where: { id: investmentId },
        data: {
          status: "APPROVED",
          startDate,
          endDate,
          profit,
        },
      });

      // 5. Create the Transaction Record (The "Bank Statement" entry)
      // This is what links to the User's transaction list automatically
      await tx.transaction.create({
        data: {
          userId: investment.userId, // Connects to the User via Foreign Key
          amount: investment.amount,
          type: "DEPOSIT",           // Tagged as a Deposit into an active plan
          status: "APPROVED",
        },
      });

      // Return the updated investment so we can send it to the frontend
      return updatedInvestment;
    });

    // 6. If the code reaches here, both steps succeeded!
    res.status(200).json({
      message: "Investment approved and transaction history recorded",
      data: result,
    });

  } catch (error) {
    // 7. If anything failed inside the $transaction, nothing was saved to the DB
    console.error("Approval Error:", error.message);
    res.status(400).json({ 
      message: error.message || "Approval failed. Database rolled back." 
    });
  }
};
