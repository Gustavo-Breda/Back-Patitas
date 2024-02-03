/*
  Warnings:

  - You are about to drop the column `total_value` on the `carrinho` table. All the data in the column will be lost.
  - Added the required column `valor_total` to the `carrinho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `especie` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carrinho" DROP COLUMN "total_value",
ADD COLUMN     "valor_total" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "especie" TEXT NOT NULL;
