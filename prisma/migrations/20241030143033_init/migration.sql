-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('processing', 'pending', 'success', 'failed');

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);
