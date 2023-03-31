/*
  Warnings:

  - You are about to drop the column `articleId` on the `Like` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_articleId_fkey";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "articleId";

-- CreateTable
CREATE TABLE "_ArticleToLike" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToLike_AB_unique" ON "_ArticleToLike"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToLike_B_index" ON "_ArticleToLike"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToLike" ADD CONSTRAINT "_ArticleToLike_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToLike" ADD CONSTRAINT "_ArticleToLike_B_fkey" FOREIGN KEY ("B") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;
