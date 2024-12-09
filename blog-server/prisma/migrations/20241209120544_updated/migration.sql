/*
  Warnings:

  - You are about to drop the column `profileId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UserId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserId` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_profileId_fkey";

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "UserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profileId";

-- CreateIndex
CREATE UNIQUE INDEX "profiles_UserId_key" ON "profiles"("UserId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
