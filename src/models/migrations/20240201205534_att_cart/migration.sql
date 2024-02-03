/*
  Warnings:

  - Added the required column `quantidade` to the `carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carrinho" ADD COLUMN     "quantidade" INTEGER NOT NULL;
