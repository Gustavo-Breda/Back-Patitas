/*
  Warnings:

  - The primary key for the `produtos_no_carrinho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_suario` on the `produtos_no_carrinho` table. All the data in the column will be lost.
  - Added the required column `id_usuario` to the `produtos_no_carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "produtos_no_carrinho" DROP CONSTRAINT "produtos_no_carrinho_id_suario_fkey";

-- AlterTable
ALTER TABLE "produtos_no_carrinho" DROP CONSTRAINT "produtos_no_carrinho_pkey",
DROP COLUMN "id_suario",
ADD COLUMN     "id_usuario" INTEGER NOT NULL,
ADD CONSTRAINT "produtos_no_carrinho_pkey" PRIMARY KEY ("id_usuario", "id_produto");

-- AddForeignKey
ALTER TABLE "produtos_no_carrinho" ADD CONSTRAINT "produtos_no_carrinho_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "carrinho"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
