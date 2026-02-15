import prisma from "../prisma.js";

export const getAdminWallets = async (req, res) => {
  try {
    const wallets = await prisma.adminWallet.findMany({
      select: {
        coin: true,
        address: true,
      },
    });

    // We transform the array into an object for easier frontend access:
    // { BTC: "0x...", ETH: "0x..." }
    const walletMap = wallets.reduce((acc, wallet) => {
      acc[wallet.coin.toLowerCase()] = wallet.address;
      return acc;
    }, {});

    res.status(200).json(walletMap);
  } catch (error) {
    console.error("Error fetching admin wallets:", error);
    res.status(500).json({ message: "Failed to load payment addresses" });
  }
};
