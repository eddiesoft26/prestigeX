import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { generateReferralCode } from "../utils/generateReferralCode.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    //REFERRAL CODE TO BE GOTTEN FROM THE FRONT END THROUGH THE PARAMS AND SENT TOGETHER IN THE BODY.
    const { fullName, email, password, referralCode } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let referrer = null;

    if (referralCode) {
      referrer = await prisma.user.findUnique({
        where: { referralCode },
      });
    }

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        referralCode: generateReferralCode(),
        referredById: referrer ? referrer.id : null,
      },
    });

    // Add referral bonus
    if (referrer) {
      await prisma.user.update({
        where: { id: referrer.id },
        data: {
          referralBonus: { increment: 10 }, // you decide reward
        },
      });
    }

       const token = jwt.sign(
      { id: newUser.id, role: newUser.role }, 
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

      const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({ 
      success: true, 
      token, 
      user: userWithoutPassword 
    });

  } catch (error) {
    console.error('DETAILED ERROR:', error)
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token, user });

  } catch (error) {
     console.error('DETAILED ERROR:', error)
    res.status(500).json({ message: "Server error" });
  }
};
