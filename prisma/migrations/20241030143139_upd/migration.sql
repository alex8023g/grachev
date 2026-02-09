/*
  Warnings:

  - Added the required column `amount` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "amount" INTEGER NOT NULL;
