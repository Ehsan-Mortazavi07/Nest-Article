/*
  Warnings:

  - You are about to drop the `_ArticleToLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToLike" DROP CONSTRAINT "_ArticleToLike_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToLike" DROP CONSTRAINT "_ArticleToLike_B_fkey";

-- DropTable
DROP TABLE "_ArticleToLike";
