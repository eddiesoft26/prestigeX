import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const wallets = [
    { coin: 'BTC', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
    { coin: 'ETH', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' }
  ];

  for (const wallet of wallets) {
    await prisma.adminWallet.upsert({
      where: { coin: wallet.coin },
      update: {},
      create: wallet,
    });
  }
}
main()
 .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());