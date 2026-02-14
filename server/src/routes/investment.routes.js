import express from "express";
import prisma from "../prisma/client.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { amount, plan } = req.body;
  const userId = req.user.id;

  try {
    let roiPercent;

    if (plan === "STARTER" && amount >= 1000) roiPercent = 10;
    else if (plan === "PREMIUM" && amount >= 5000) roiPercent = 15;
    else if (plan === "PRO" && amount >= 10000) roiPercent = 20;
    else {
      return res.status(400).json({ message: "Invalid plan or amount" });
    }

    const investment = await prisma.investment.create({
      data: {
        userId,
        amount,
        plan,
        roiPercent,
      },
    });

    res.json(investment);

  } catch (error) {
    res.status(500).json({ message: "Investment failed" });
  }
});

export default router;
