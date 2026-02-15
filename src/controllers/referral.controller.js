import prisma from "../prisma.js";

export const getMyReferrals = async (req, res) => {
  const userId = req.user.id;

  try {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        referralBonus: true, // 1. Get the actual total bonus from User model
        referrals: {
          select: {
            id: true,
            fullName: true,
            createdAt: true,
            // 2. Fetch INVESTMENTS instead of deposits
            investments: {
              where: { status: "APPROVED" },
              select: { amount: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    // 3. Map the data for the Frontend Table
    const formattedReferrals = userData.referrals.map(ref => ({
      name: ref.fullName,
      date: new Date(ref.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      }),
      // Calculate 10% of their total approved investments
      reward: ref.investments.reduce((sum, inv) => sum + (inv.amount * 0.1), 0)
    }));

    // 4. Return both the list AND the total bonus balance
    res.status(200).json({
      referrals: formattedReferrals,
      totalReferralEarnings: userData.referralBonus // This is the "Commission" field
    });

  } catch (error) {
    console.error("Referral Fetch Error:", error.message);
    res.status(500).json({ message: "Failed to load your network" });
  }
};
