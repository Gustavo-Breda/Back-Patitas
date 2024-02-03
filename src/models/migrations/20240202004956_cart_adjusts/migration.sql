/*
  Warnings:

  - You are about to drop the column `quantidade` on the `carrinho` table. All the data in the column will be lost.
  - Added the required column `qunt_produtos` to the `carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carrinho" DROP COLUMN "quantidade",
ADD COLUMN     "qunt_produtos" INTEGER NOT NULL;
