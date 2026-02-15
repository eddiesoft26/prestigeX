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
        message: "You must have invested to be able to withdraw",
      });
    }

    const totalInvestmentBalance = investments.reduce((sum, inv) => {
      return sum + Number(inv.amount || 0) + Number(inv.profit || 0);
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

    // 4. Validate Amount
    const numAmount = parseFloat(amount);
    if (numAmount > withdrawableBalance) {
      return res
        .status(400)
        .json({ message: "Insufficient withdrawable balance" });
    }

    // 5. DATABASE SAVE (Check your Enum casing!)
    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId,
        amount: numAmount,
        walletAddress: walletAddress,
        coin: coin.toUpperCase(), // Ensure this is "BTC" or "ETH" to match Prisma Enum
        status: "PENDING",
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Withdrawal submitted", withdrawal });
  } catch (error) {
    console.error("PRISMA ERROR DETAILS:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTransactions = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Fetch all Investments
    const investments = await prisma.investment.findMany({
      where: { userId },
      select: {
        id: true,
        plan: true,
        amount: true,
        status: true,
        createdAt: true,
      },
    });

    // 2. Fetch all Withdrawals
    const withdrawals = await prisma.withdrawal.findMany({
      where: { userId },
      select: {
        id: true,
        amount: true,
        status: true,
        createdAt: true,
        coin: true,
      },
    });

    // 3. Format and Combine
    const formattedInvestments = investments.map((inv) => ({
      id: inv.id,
      type: "INVESTMENT",
      plan: inv.plan,
      amount: inv.amount,
      status:
        inv.status === "APPROVED"
          ? "Completed"
          : inv.status === "PENDING"
            ? "Pending"
            : "Rejected",
      date: inv.createdAt,
    }));

    const formattedWithdrawals = withdrawals.map((w) => ({
      id: w.id,
      type: "WITHDRAWAL",
      plan: "-", // Withdrawals don't have plans
      amount: w.amount,
      status:
        w.status === "APPROVED"
          ? "Completed"
          : w.status === "PENDING"
            ? "Pending"
            : "Rejected",
      date: w.createdAt,
    }));

    // 4. Merge and Sort (Newest first)
    const allTransactions = [
      ...formattedInvestments,
      ...formattedWithdrawals,
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(allTransactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

export const uploadProof = async (req, res) => {
  const { reference } = req.body; // This is the Investment ID (targetId)
  const cleanId = reference?.trim();
  console.log("File received by Multer:", req.file);
  console.log("Body Object:", req.body); // Check if reference is arriving
  const imageUrl = req.file?.path; // This is the URL returned by Cloudinary

  if (!imageUrl) return res.status(400).json({ message: "No image uploaded" });
  if (!cleanId)
    return res.status(400).json({ message: "No investment reference found" });

  try {
    const updatedInvestment = await prisma.investment.update({
      where: { id: cleanId },
      data: {
        proofUrl: imageUrl, // ✅ Now we are actually saving the link!
        status: "PENDING", // Keep it pending for admin review
      },
    });

    res.status(200).json({
      success: true,
      message: "Payment proof uploaded and linked successfully",
      data: updatedInvestment,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Database update failed. Check the ID." });
  }
};

export const getPendingInvestments = async (req, res) => {
  try {
    const pending = await prisma.investment.findMany({
      where: {
        userId: req.user.id,
        status: "PENDING",
        proofUrl: null, // Only fetch those without proof yet
      },
      orderBy: { createdAt: "desc" },
      take: 1, // Only get the latest one
    });
    res.json(pending);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending investments" });
  }
};
