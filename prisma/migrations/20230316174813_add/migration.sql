/*
  Warnings:

  - You are about to drop the `ChildOnCtegory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChildOnCtegory" DROP CONSTRAINT "ChildOnCtegory_childId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "parentId" INTEGER;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "parentId" INTEGER;

-- DropTable
DROP TABLE "ChildOnCtegory";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
