/*
  Warnings:

  - Added the required column `sexo` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "sexo" TEXT NOT NULL;