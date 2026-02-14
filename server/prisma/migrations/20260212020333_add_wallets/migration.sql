-- CreateTable
CREATE TABLE "AdminWallet" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminWallet_pkey" PRIMARY KEY ("id")
);
