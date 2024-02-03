/*
  Warnings:

  - The primary key for the `carrinho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `qunt_produtos` on the `carrinho` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `carrinho` table. All the data in the column will be lost.
  - The primary key for the `compra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data` on the `compra` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `compra` table. All the data in the column will be lost.
  - The primary key for the `produtos_na_compra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `compra_data` on the `produtos_na_compra` table. All the data in the column will be lost.
  - You are about to drop the column `compra_usuario_id` on the `produtos_na_compra` table. All the data in the column will be lost.
  - You are about to drop the column `produto_id` on the `produtos_na_compra` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `produtos_na_compra` table. All the data in the column will be lost.
  - The primary key for the `produtos_no_carrinho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `carrinho_usuario_id` on the `produtos_no_carrinho` table. All the data in the column will be lost.
  - You are about to drop the column `produto_id` on the `produtos_no_carrinho` table. All the data in the column will be lost.
  - Added the required column `id_usuario` to the `carrinho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_produtos` to the `carrinho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `produtos_na_compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_compra` to the `produtos_na_compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_compra` to the `produtos_na_compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_produto` to the `produtos_na_compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_produto` to the `produtos_no_carrinho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_suario` to the `produtos_no_carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carrinho" DROP CONSTRAINT "carrinho_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "compra" DROP CONSTRAINT "compra_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "produtos_na_compra" DROP CONSTRAINT "produtos_na_compra_compra_data_compra_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "produtos_na_compra" DROP CONSTRAINT "produtos_na_compra_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "produtos_no_carrinho" DROP CONSTRAINT "produtos_no_carrinho_carrinho_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "produtos_no_carrinho" DROP CONSTRAINT "produtos_no_carrinho_produto_id_fkey";

-- AlterTable
ALTER TABLE "carrinho" DROP CONSTRAINT "carrinho_pkey",
DROP COLUMN "qunt_produtos",
DROP COLUMN "usuario_id",
ADD COLUMN     "id_usuario" INTEGER NOT NULL,
ADD COLUMN     "qtd_produtos" INTEGER NOT NULL,
ADD CONSTRAINT "carrinho_pkey" PRIMARY KEY ("id_usuario");

-- AlterTable
ALTER TABLE "compra" DROP CONSTRAINT "compra_pkey",
DROP COLUMN "data",
DROP COLUMN "usuario_id",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id_usuario" INTEGER NOT NULL,
ADD CONSTRAINT "compra_pkey" PRIMARY KEY ("date", "id_usuario");

-- AlterTable
ALTER TABLE "produtos_na_compra" DROP CONSTRAINT "produtos_na_compra_pkey",
DROP COLUMN "compra_data",
DROP COLUMN "compra_usuario_id",
DROP COLUMN "produto_id",
DROP COLUMN "quantidade",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "data_compra" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_compra" INTEGER NOT NULL,
ADD COLUMN     "id_produto" INTEGER NOT NULL,
ADD CONSTRAINT "produtos_na_compra_pkey" PRIMARY KEY ("id_produto", "data_compra", "id_compra");

-- AlterTable
ALTER TABLE "produtos_no_carrinho" DROP CONSTRAINT "produtos_no_carrinho_pkey",
DROP COLUMN "carrinho_usuario_id",
DROP COLUMN "produto_id",
ADD COLUMN     "id_produto" INTEGER NOT NULL,
ADD COLUMN     "id_suario" INTEGER NOT NULL,
ADD CONSTRAINT "produtos_no_carrinho_pkey" PRIMARY KEY ("id_suario", "id_produto");

-- AddForeignKey
ALTER TABLE "carrinho" ADD CONSTRAINT "carrinho_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_na_compra" ADD CONSTRAINT "produtos_na_compra_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_na_compra" ADD CONSTRAINT "produtos_na_compra_data_compra_id_compra_fkey" FOREIGN KEY ("data_compra", "id_compra") REFERENCES "compra"("date", "id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_no_carrinho" ADD CONSTRAINT "produtos_no_carrinho_id_suario_fkey" FOREIGN KEY ("id_suario") REFERENCES "carrinho"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_no_carrinho" ADD CONSTRAINT "produtos_no_carrinho_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
