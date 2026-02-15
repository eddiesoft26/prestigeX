/*
  Warnings:

  - You are about to drop the column `currency` on the `AdminWallet` table. All the data in the column will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[coin]` on the table `AdminWallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coin` to the `AdminWallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'INVESTMENT';

-- AlterTable
ALTER TABLE "AdminWallet" DROP COLUMN "currency",
ADD COLUMN     "coin" "CoinType" NOT NULL;

-- AlterTable
ALTER TABLE "Withdrawal" ADD COLUMN     "rejectionReason" TEXT;

-- DropTable
DROP TABLE "Wallet";

-- CreateIndex
CREATE UNIQUE INDEX "AdminWallet_coin_key" ON "AdminWallet"("coin");
