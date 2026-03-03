import prisma from "../prisma.js";

export const checkIPBlacklist = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  try {
    const isBlocked = await prisma.blacklist.findUnique({
      where: { ip: ip }
    });

    if (isBlocked) {
      return res.status(403).json({ 
        message: "Your IP address has been flagged for fraudulent activity and is blocked." 
      });
    }

    next();
  } catch (error) {
    next(); // Move on if database check fails to avoid locking out everyone
  }
};