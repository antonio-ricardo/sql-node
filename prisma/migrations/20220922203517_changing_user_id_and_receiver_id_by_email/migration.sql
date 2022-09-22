/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_userId_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "receiverId",
DROP COLUMN "userId",
ADD COLUMN     "receiverEmail" TEXT,
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_receiverEmail_fkey" FOREIGN KEY ("receiverEmail") REFERENCES "Users"("email") ON DELETE SET NULL ON UPDATE CASCADE;
