-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT,
    "cartao" TEXT,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrinho" (
    "usuario_id" INTEGER NOT NULL,
    "total_value" MONEY NOT NULL,

    CONSTRAINT "carrinho_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,
    "descricao" TEXT,
    "categoria" TEXT[],
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "vacina" TEXT[],
    "usuarioID" INTEGER NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compra" (
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,
    "total_value" MONEY NOT NULL,

    CONSTRAINT "compra_pkey" PRIMARY KEY ("data","usuario_id")
);

-- CreateTable
CREATE TABLE "produtos_na_compra" (
    "produto_id" INTEGER NOT NULL,
    "compra_data" TIMESTAMP(3) NOT NULL,
    "compra_usuario_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "produtos_na_compra_pkey" PRIMARY KEY ("produto_id","compra_data","compra_usuario_id")
);

-- CreateTable
CREATE TABLE "produtos_no_carrinho" (
    "carrinho_usuario_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "produtos_no_carrinho_pkey" PRIMARY KEY ("carrinho_usuario_id","produto_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_key" ON "usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "carrinho" ADD CONSTRAINT "carrinho_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_usuarioID_fkey" FOREIGN KEY ("usuarioID") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_na_compra" ADD CONSTRAINT "produtos_na_compra_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_na_compra" ADD CONSTRAINT "produtos_na_compra_compra_data_compra_usuario_id_fkey" FOREIGN KEY ("compra_data", "compra_usuario_id") REFERENCES "compra"("data", "usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_no_carrinho" ADD CONSTRAINT "produtos_no_carrinho_carrinho_usuario_id_fkey" FOREIGN KEY ("carrinho_usuario_id") REFERENCES "carrinho"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_no_carrinho" ADD CONSTRAINT "produtos_no_carrinho_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
